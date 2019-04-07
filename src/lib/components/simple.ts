import IElectronic, { MoveLeadsRelativeToComponent } from "../interface/iElectronic";
import { Lead } from "../lead";
import Vector from "../vector";
import { IMoveable } from "../interface/iMoveable";

export default class Simple implements IElectronic, IMoveable {
    inputs: Array<Lead>;
    outputs: Array<Lead>;
    name: string = "component";
    uid: string = "";

    position: Vector;

    constructor() {
        this.inputs = [];
        this.outputs = [];
        this.inputs.push(new Lead(Vector.Zero()));
        this.outputs.push(new Lead(Vector.Zero()));
    }

    get input(): Lead {
        return this.inputs[0];
    }

    set input(lead: Lead) {
        this.inputs[0] = lead;
    }

    get output(): Lead {
        return this.outputs[0];
    }

    set output(lead: Lead) {
        this.outputs[0].on;
    }

    updateOutput() {
        this.output.on = this.input.on;
    }

    move(delta: Vector): void {
        this.position = this.position.add(delta);
        MoveLeadsRelativeToComponent(this, delta);
    }

    moveTo(position: Vector): void {
        const delta = position.subtract(this.position);
        this.move(delta);
    }
}