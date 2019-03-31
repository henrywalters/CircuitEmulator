import Simple from "../simple";

export default class Not extends Simple {
    updateOutput() {
        this.output.on = !this.input.on;
    }
}