import Simple from "./simple";
import IDrawable from "../interface/iDrawable";
import Vector from "../vector";
import IElectronic from "../interface/iElectronic";

export enum WireDrawModes {
    MiddleSplitHorizontalFirst,
    MiddleSplitVerticalFirst,
    HorizontalFirst,
    VerticalFirst,
    Diagonal
}

export default class Wire extends Simple implements IDrawable {
    visible: boolean = true;
    name: string = "wire";
    position: Vector;
    public positionB: Vector;

    public drawMode: WireDrawModes = WireDrawModes.VerticalFirst;

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

        switch(this.drawMode) {
            case WireDrawModes.MiddleSplitHorizontalFirst:
                context.moveTo(this.position.x, this.position.y);
                context.lineTo(this.position.x + delta.x / 2, this.position.y);
                context.lineTo(this.position.x + delta.x / 2, this.position.y + delta.y);
                context.lineTo(this.position.x + delta.x, this.position.y + delta.y);
                context.stroke();
                break;
            case WireDrawModes.MiddleSplitVerticalFirst:
                context.moveTo(this.position.x, this.position.y);
                context.lineTo(this.position.x, this.position.y + delta.y / 2);
                context.lineTo(this.position.x + delta.x, this.position.y + delta.y / 2);
                context.lineTo(this.position.x + delta.x, this.position.y + delta.y);
                context.stroke();
                break;
            case WireDrawModes.HorizontalFirst:
                context.moveTo(this.position.x, this.position.y);
                context.lineTo(this.position.x + delta.x, this.position.y);
                context.lineTo(this.position.x + delta.x, this.position.y + delta.y)
                context.stroke();
                break;
            case WireDrawModes.VerticalFirst: 
                context.moveTo(this.position.x, this.position.y);
                context.lineTo(this.position.x, this.position.y + delta.y);
                context.lineTo(this.position.x + delta.x, this.position.y + delta.y);
                context.stroke();
                break;
            case WireDrawModes.Diagonal:
                context.moveTo(this.position.x, this.position.y);
                context.lineTo(this.position.x + delta.x, this.position.y + delta.y);
                context.stroke();
                break;
        }
        
        context.lineWidth = 1;
    }
}