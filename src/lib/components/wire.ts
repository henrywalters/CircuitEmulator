import Simple from "./simple";
import IDrawable from "../interface/iDrawable";
import Vector from "../vector";
import IElectronic from "../interface/iElectronic";

export default class Wire extends Simple implements IDrawable {
    visible: boolean = true;
    name: string = "wire";
    position: Vector;
    public positionB: Vector;

    constructor(positionA: Vector, positionB: Vector) {
        super();
        this.position = positionA;
        this.positionB = positionB;
    }

    draw(context: CanvasRenderingContext2D): void {
        const delta = this.positionB.subtract(this.position);
        context.beginPath();
        if (this.input.on) {
            context.strokeStyle = "#185611";
        }

        context.lineWidth = 5;

        if (delta.y <= 0) {
            context.moveTo(this.position.x, this.position.y);
            context.lineTo(this.position.x, this.position.y + delta.y);
            context.lineTo(this.position.x + delta.x, this.position.y + delta.y);
            context.stroke();
        } else {
            context.moveTo(this.position.x, this.position.y);
            context.lineTo(this.position.x + delta.x, this.position.y);
            context.lineTo(this.position.x + delta.x, this.position.y + delta.y)
            context.stroke();
        }
    }
}