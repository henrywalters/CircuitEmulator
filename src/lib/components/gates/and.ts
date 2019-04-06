import BinaryMultiplexer from "../binaryMultiplexer";
import IDrawable from "../../interface/iDrawable";

export default class And extends BinaryMultiplexer implements IDrawable {

    visible: boolean = true;

    updateOutput() {
        this.output.on = this.inputA.on && this.inputB.on;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.moveTo(this.position.x + this.width * 0.65, this.position.y);
        context.lineTo(this.position.x, this.position.y);
        context.lineTo(this.position.x, this.position.y + this.height);
        context.lineTo(this.position.x + this.width * 0.65, this.position.y + this.height);
        context.stroke();
        context.beginPath();
        context.arc(this.position.x + this.width * 0.725, this.position.y + this.height / 2, this.width * 0.35, 1.5 * Math.PI, 0.5 * Math.PI);
        context.stroke();
    }
}