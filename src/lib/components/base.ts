import IElectronic from "../interface/iElectronic";
import { Lead } from "../lead";

export default class BaseComponent implements IElectronic {
    name: string = "BaseComponent";
    uid: string = "";
    inputs: Array<Lead>;
    outputs: Array<Lead>;

    inputCount: number = 0;
    outputCount: number = 0;

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
}