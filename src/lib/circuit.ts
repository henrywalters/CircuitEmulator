import IDrawable, { IsDrawable } from "./interface/iDrawable";
import Vector from "./vector";
import IElectronic from "./interface/iElectronic";
import Wire from "./components/wire";
import Display from "./display";
import Input from "./input";
import { Lead, LeadStates } from "./lead";
import { IsClickConvertable, MakeClickable, IsClickable } from "./interface/iClickable";
import IInputHandler from "./interface/iInputHandler";
import { IsMoveable } from "./interface/iMoveable";

export class CircuitConnection {
    inputToNode: CircuitNode;
    outputFromNode: CircuitNode;
    inputLeadIndex: number;
    outputLeadIndex: number;

    wire: Wire;
}

export class CircuitNode {
    component: IElectronic;
    outputConnections: Array<CircuitConnection>
    inputConnections: Array<CircuitConnection>
}

enum UserStates {
    None,
    InputSelected,
    OutputSelected,
    Dragging,
}

export default class Circuit implements IInputHandler {

    display: Display;
    input: Input;

    private componentTypeCounts: Map<string, number>;
    private components: Map<string, CircuitNode>;
    private connections: Map<string, CircuitConnection>;

    private leads: Array<Lead>;

    private source: CircuitNode;

    private userState: UserStates = UserStates.None;

    private selectedLead: Lead = null;
    private selectedNode: CircuitNode = null;

    private tempWire: Wire = null;

    private mouseOffset: Vector;

    constructor(display: Display, input: Input) {
        this.source = null;
        this.input = input;
        this.display = display;
        this.leads = [];
        this.components = new Map<string, CircuitNode>();
        this.componentTypeCounts = new Map<string, number>();
        this.connections = new Map<string, CircuitConnection>();
    }

    setSource(node: CircuitNode): void {
        this.source = node;
        if (this.isPartOfLoop(node)) {
            
        } else {
            //throw new Error("Node " + node.component.uid + " is not part of a valid loop and can therefore not be made the circuit source");
        }
    }

    onClick(input: Input): void {
        this.leads.forEach(lead => {
            if (lead.containsPoint(this.input.mousePos)) {
                lead.onClickFn(this.input.mousePos);
            }
        })
    }

    onMousedown(input: Input): void {
        if (this.userState === UserStates.None) {
            this.components.forEach(node => {
                if (IsClickable(node.component) && IsDrawable(node.component)) {
                    if (node.component.containsPoint(this.input.mousePos)) {
                        this.selectedNode = node;
                        this.userState = UserStates.Dragging;
                        this.mouseOffset = this.input.mousePos.subtract(node.component.position);
                    }
                }
            })
        }
    }

    onMouseup(input: Input): void {
        if (this.userState === UserStates.Dragging) {
            this.userState = UserStates.None;
            this.selectedNode = null;
        }
    }

    loop(): void {

        if (this.tempWire !== null) {
            this.tempWire.positionB = this.input.mousePos;
            this.tempWire.draw(this.display.context);
        }

        if (this.userState === UserStates.Dragging && IsMoveable(this.selectedNode.component)) {

            let adjustedMousePos = this.input.mousePos.subtract(this.mouseOffset);

            this.selectedNode.component.moveTo(adjustedMousePos);
            this.selectedNode.inputConnections.forEach(connection => {
                connection.wire.positionB = connection.inputToNode.component.inputs[connection.inputLeadIndex].position;
            })

            this.selectedNode.outputConnections.forEach(connection => {
                connection.wire.position = connection.outputFromNode.component.outputs[connection.outputLeadIndex].position;
            })
        } 
        

        if (this.source !== null) {
            this.breadthFirstTraverse(this.source, (node) => {
                node.outputConnections.forEach(output => {
                    if (this.isPartOfLoop(output.inputToNode)) {
                        output.inputToNode.component.inputs[output.inputLeadIndex].on = node.component.outputs[output.outputLeadIndex].on;
                        output.inputToNode.component.updateOutput();
                    }
                });
            })
        } else {
            throw new Error("Source must be set to loop. Try using a battery");
        }
    }

    inLeadList(lead: Lead, leads: Lead[]): boolean {
        let exists = false;
        leads.forEach(l => {
            if (l.uid === lead.uid) {
                exists = true;
            }
        })
        return exists;
    }

    leadIndex(lead: Lead): number {
        return lead.uid.split("_")[3] as unknown as number;
    }

    leadClickFn(node: CircuitNode, lead: Lead): void {
        if (this.userState === UserStates.None) {
            if (this.inLeadList(lead, node.component.inputs)) {
                this.userState = UserStates.InputSelected;
                this.selectedLead = lead;
                this.selectedLead.state = LeadStates.Connecting;
                this.tempWire = new Wire(this.selectedLead.position, this.input.mousePos);
                this.selectedNode = node;
            } else if (this.inLeadList(lead, node.component.outputs)) {
                this.userState = UserStates.OutputSelected
                this.selectedLead = lead;
                this.selectedLead.state = LeadStates.Connecting;
                this.tempWire = new Wire(this.selectedLead.position, this.input.mousePos);
                this.selectedNode = node;
            } else {
                this.userState = UserStates.None;
                this.tempWire = null;
                console.warn("Didnt match a lead up");
            }
        } else if (this.userState === UserStates.OutputSelected) {
            if (this.inLeadList(lead, node.component.inputs)) {
                if (!lead.connected) {
                    this.connect(this.selectedNode, this.leadIndex(this.selectedLead), node, this.leadIndex(lead));
                    this.userState = UserStates.None;
                    this.selectedLead = null;
                    this.selectedNode = null;
                    this.tempWire = null;
                } else {
                    this.userState = UserStates.None;
                    this.tempWire = null;
                }
            }
        } else if (this.userState === UserStates.InputSelected) {
            if (this.inLeadList(lead, node.component.outputs)) {
                if (!lead.connected) {
                    this.connect(node, this.leadIndex(lead), this.selectedNode, this.leadIndex(this.selectedLead));
                    this.userState = UserStates.None;
                    this.selectedLead = null;
                    this.selectedNode = null;
                    this.tempWire = null;
                } else {
                    this.userState = UserStates.None;
                    this.tempWire = null;
                }
            }
        }
    }

    addComponent(component: IElectronic): string {
        let count = 0;
        if (this.componentTypeCounts.has(component.name)) {
            count = this.componentTypeCounts.get(component.name);
            count += 1;      
        }
        this.componentTypeCounts.set(component.name, count);
        const id = component.name + "_" + count;

        let node = new CircuitNode();
        node.component = component;
        node.component.uid = id;
        node.inputConnections = [];
        node.outputConnections = [];

        if (IsDrawable(node.component)) {
            this.display.addElement(node.component);
        }

        if (IsClickConvertable(node.component)) {
            node.component = MakeClickable(node.component, (position: Vector) => {

            });
        }

        let inputIndex = 0;
        node.component.inputs.forEach(input => {
            if (IsDrawable(node.component)) {
                this.display.addElement(input);
            }
            input.uid = node.component.uid + "_input_" + inputIndex; 
            input.onClickFn = (mousePos: Vector) => { this.leadClickFn(node, input) };
            this.leads.push(input);
            inputIndex += 1;
        })

        let outputIndex = 0;
        node.component.outputs.forEach(output => {
            if (IsDrawable(node.component)) {
                this.display.addElement(output);
            }
            output.uid = node.component.uid + "_output_" + outputIndex;
            output.onClickFn = (mousePos: Vector) => { this.leadClickFn(node, output) };
            this.leads.push(output);
            outputIndex += 1;
        })

        this.components.set(id, node);

        return id;
    }

    getNode(id: string): CircuitNode {
        if (this.components.has(id)) {
            return this.components.get(id);
        } else {
            throw new Error("Component: " + id + " does not exist");
        }
    }

    getComponent(id: string): IElectronic {
        if (this.components.has(id)) {
            return this.components.get(id).component;
        } else {
            throw new Error("Component: " + id + " does not exist");
        }
    }

    connect(outputFrom: CircuitNode, outputLeadIndex: number, inputTo: CircuitNode, inputLeadIndex: number): boolean {
        if (outputLeadIndex >= outputFrom.component.outputs.length) {
            console.warn("outputLeadIndex out of bounds");
            return false;
        } else if (inputLeadIndex >= inputTo.component.inputs.length) {
            console.warn("inputLeadIndex out of bounds");
            return false;
        } else if (outputFrom.component.outputs[outputLeadIndex].connected) {
            console.warn("Selected output lead of " + outputFrom.component.uid + " already connected");
            return false;
        } else if (inputTo.component.inputs[inputLeadIndex].connected) {
            console.warn("Selected input lead of " + inputTo.component.uid + " already connected");
            return false;
        } else {
            
            const connectionId = outputFrom.component.uid + "-" + inputTo.component.uid;

            let connection = new CircuitConnection();

            outputFrom.component.outputs[outputLeadIndex].connected = true;
            inputTo.component.inputs[inputLeadIndex].connected = true;

            connection.inputToNode = inputTo;
            connection.inputLeadIndex = inputLeadIndex;
            connection.outputFromNode = outputFrom;
            connection.outputLeadIndex = outputLeadIndex;
            
            connection.wire = new Wire(outputFrom.component.outputs[outputLeadIndex].position, inputTo.component.inputs[inputLeadIndex].position);

            inputTo.inputConnections.push(connection);
            outputFrom.outputConnections.push(connection);

            this.display.addElement(connection.wire);

            this.connections.set(connectionId, connection);

            return true;
        }
    }

    connectSimple(outputFrom, inputTo): boolean {
        return this.connect(outputFrom, 0, inputTo, 0);
    }

    disconnect(nodeA: CircuitNode, nodeB: CircuitNode): boolean {
        const connectionId = nodeA.component.uid + "-" + nodeB.component.uid;

        if (this.connections.has(connectionId)) {
            let connection = this.connections.get(connectionId);

            connection.outputFromNode[connection.outputLeadIndex] = false;
            connection.inputToNode[connection.inputLeadIndex] = false;
            connection.wire.visible = false;

            this.connections.delete(connectionId);

            return true;
        } else {
            console.warn("Connection between " + nodeA.component.uid + " and " + nodeB.component.uid + " does not exist");
            return false;
        }
    }

    breadthFirstTraverse(startingNode: CircuitNode, traversalFn: (currentNode: CircuitNode) => void): void {
        let nodeQueue = [startingNode];
        let visited = {};

        let originNode = null;

        while (nodeQueue.length > 0) {
            let currentNode = nodeQueue[0];

            if (originNode !== null) {
                traversalFn(currentNode);
            }

            originNode = currentNode;

            for (let i = 0; i < currentNode.outputConnections.length; i++) {
                if (typeof visited[currentNode.outputConnections[i].inputToNode.component.uid] === "undefined") {
                    nodeQueue.push(currentNode.outputConnections[i].inputToNode);
                    visited[currentNode.outputConnections[i].inputToNode.component.uid]  = true;
                }
            }   
            nodeQueue.shift();
        }
    }

    depthFirstTraverse(startingNode: CircuitNode, traversalFn: (currentNode: CircuitNode) => void): void {
        let nodeStack = [startingNode];
        let visited = {};

        while (nodeStack.length > 0) {
            let currentNode = nodeStack[nodeStack.length - 1];

            let hasChildren = false;

            if (currentNode.outputConnections.length > 0) {
                for (let i = 0; i < currentNode.outputConnections.length; i++) {
                    if (typeof visited[currentNode.outputConnections[i].inputToNode.component.uid] === "undefined") {
                        nodeStack.push(currentNode.outputConnections[i].inputToNode);
                        traversalFn(currentNode.outputConnections[i].inputToNode);
                        visited[currentNode.outputConnections[i].inputToNode.component.uid]  = true;
                        hasChildren = true;
                        break;
                    }
                }   
            }

            if (!hasChildren) {
                nodeStack.pop();
            }
        }
    }

    isPartOfLoop(startingNode: CircuitNode): boolean {
        const startingId = startingNode.component.uid;
        let isPartOf = false;
        this.depthFirstTraverse(startingNode, (node) => {
            if (node.component.uid === startingId) {
                isPartOf = true;
            }
        })

        return isPartOf;
    }
}