import IElectronic from "../interface/iElectronic";
import IGeometric, { Shape } from "../interface/IGeometric";
import { Lead } from "../lead";
import Vector from "../vector";

export default class BinaryMultiplexer implements IElectronic, IGeometric {
    width: number = 75;
    height: number = 40;
    shape: Shape = Shape.Rectangle;
    name: string = "binarymultiplexer";
    uid: string = "";

    inputs: Array<Lead>;
    outputs: Array<Lead>;

    position: Vector;

    constructor(position: Vector) {
        this.position = position;
        this.inputs.push(new Lead(this.position.add(new Vector(0, this.height / 4))));
        this.inputs.push(new Lead(this.position.add(new Vector(0, (this.height * 3) / 4))));
        this.outputs.push(new Lead(this.position.add(new Vector(this.width, this.height / 2))));
    }

    get inputA(): Lead {
        return this.inputs[0];
    }

    set inputA(lead: Lead) {
        this.inputs[0] = lead;
    }

    get inputB(): Lead {
        return this.inputs[1];
    }

    set inputB(lead: Lead) {
        this.inputs[1] = lead;
    }

    get output(): Lead {
        return this.outputs[0];
    }

    set output(lead: Lead) {
        this.outputs[0] = lead;
    }

    updateOutput() {
        this.output.on = false;
    }
}