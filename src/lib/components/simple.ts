import IElectronic from "../interface/iElectronic";
import { Lead } from "../lead";
import Vector from "../vector";

export default class Simple implements IElectronic {
    inputs: Array<Lead>;
    outputs: Array<Lead>;
    name: string = "electronic_component";
    uid: string = "";
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
}