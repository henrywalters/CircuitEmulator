import BinaryMultiplexer from "../binaryMultiplexer";

export default class And extends BinaryMultiplexer {
    updateOutput() {
        this.output.on = this.inputA.on && this.inputB.on;
    }
}