import BinaryMultiplexer from "../binaryMultiplexer";

export default class Xor extends BinaryMultiplexer {
    updateOutput() {
        this.output.on = (this.inputA.on && !this.inputB.on) || (!this.inputA.on && this.inputB.on);
    }
}