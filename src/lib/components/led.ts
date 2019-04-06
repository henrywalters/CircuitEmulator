import Simple from "./simple";
import IDrawable from "../interface/iDrawable";
import Vector from "../vector";
import IGeometric, { Shape, geomContainsPoint } from "../interface/IGeometric";
import IClickable from "../interface/iClickable";
import { IMoveable } from "../interface/iMoveable";
import { MoveLeadsRelativeToComponent } from "../interface/iElectronic";

export default class LED extends Simple implements IDrawable, IGeometric {
    visible: boolean = true;
    width: number = 50;
    height: number = 50;
    shape: Shape = Shape.Circle;

    name: string = "LED";

    color: string;

    constructor(color: string, position: Vector) {
        super();
        this.color = color;
        this.position = position;
        this.input.position = position.add(new Vector(this.width / -2.0 - this.input.width / 2.0, 0));
        this.output.position = position.add(new Vector(this.width / 2.0 + this.input.width / 2.0, 0));
        
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        if (this.input.on) {
            context.fillStyle = this.color;
        }
        context.arc(this.position.x, this.position.y, this.width / 2, 0, 2 * Math.PI);

        if (this.input.on) {
            context.fill();
        }
        context.stroke();
    }
}