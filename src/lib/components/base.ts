import IElectronic, { MoveLeadsRelativeToComponent } from "../interface/iElectronic";
import { Lead } from "../lead";
import { IMoveable } from "../interface/iMoveable";
import Vector from "../vector";

export default class BaseComponent implements IElectronic, IMoveable {
    name: string = "BaseComponent";
    uid: string = "";
    inputs: Array<Lead>;
    outputs: Array<Lead>;

    inputCount: number = 0;
    outputCount: number = 0;

    position: Vector;

    constructor() {
        this.inputs = [];
        this.outputs = [];
    }

    inputInBounds(leadIndex: number): boolean {
        return leadIndex >= 0 && leadIndex < this.inputCount;
    }

    outputInBounds(leadIndex: number): boolean {
        return leadIndex >= 0 && leadIndex < this.outputCount;
    }

    pushInput(lead: Lead): void {
        this.inputs.push(lead);
        this.inputCount += 1;
    }

    pushOutput(lead: Lead): void {
        this.outputs.push(lead);
        this.outputCount += 1;
    }

    input(leadIndex: number): Lead {
        if (this.inputInBounds(leadIndex)) {
            return this.inputs[leadIndex];
        } else {
            throw new Error("Input Lead number: " + leadIndex + " of " + this.name + " #" + this.uid + " does not exist");
        }
    }

    output(leadIndex: number): Lead {
        if (this.outputInBounds(leadIndex)) {
            return this.inputs[leadIndex];
        } else {
            throw new Error("Output Lead number: " + leadIndex + " of " + this.name + " #" + this.uid + " does not exist");
        }
    }

    updateOutput(): void {}

    move(delta: Vector): void {
        this.position = this.position.add(delta);
        MoveLeadsRelativeToComponent(this, delta);
    }

    moveTo(position: Vector): void {
        const delta = position.subtract(this.position);
        this.move(delta);
    }
}