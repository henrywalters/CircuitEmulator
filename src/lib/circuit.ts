import IDrawable, { IsDrawable } from "./interface/iDrawable";
import Vector from "./vector";
import IElectronic from "./interface/iElectronic";
import Wire from "./components/wire";
import Display from "./display";

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

export default class Circuit  {

    display: Display;

    private componentTypeCounts: Map<string, number>;
    private components: Map<string, CircuitNode>;
    private connections: Map<string, CircuitConnection>;

    //list of nodes that will be starting points for circuit traversal. Physically equates to active components.
    private sources: Array<CircuitNode>;

    constructor(display: Display) {
        this.display = display;
        this.components = new Map<string, CircuitNode>();
        this.componentTypeCounts = new Map<string, number>();
        this.connections = new Map<string, CircuitConnection>();
        this.sources = [];
    }

    addSource(node: CircuitNode): void {
        this.sources.push(node);
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

            node.component.inputs.forEach(input => {
                this.display.addElement(input);
            })

            node.component.outputs.forEach(output => {
                this.display.addElement(output);
            })
        }

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
            console.warn("Selected output lead already connected");
            return false;
        } else if (inputTo.component.inputs[inputLeadIndex].connected) {
            console.warn("Selected input lead already connected");
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