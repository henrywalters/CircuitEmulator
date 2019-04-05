import Simple from "./simple";
import IDrawable from "../interface/iDrawable";
import Vector from "../vector";
import IGeometric, { Shape } from "../interface/IGeometric";

export default class Battery extends Simple implements IDrawable, IGeometric {

    name: string = "battery";

    visible: boolean = true;
    position: Vector;

    width: number = 40;
    height: number = 75;

    private padding: number = 15;
    private lineSize: number = 10;

    shape: Shape = Shape.Rectangle;

    constructor(position: Vector) {
        super();
        this.position = position;
        this.input.position = this.position.add(new Vector(this.width / 2.0, 0));
        this.output.position = this.position.add(new Vector(this.width / 2.0, this.height));
    }

    updateOutput(): void {
        this.output.on = true;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.stroke();

        context.beginPath();
        
        const minusLoc = this.position.add(new Vector(this.width / 2, this.padding));
        const plusLoc = this.position.add(new Vector(this.width / 2, this.height - this.padding));

        context.moveTo(minusLoc.x - this.lineSize / 2, minusLoc.y);
        context.lineTo(minusLoc.x + this.lineSize / 2, minusLoc.y);

        context.stroke();

        context.beginPath();

        context.moveTo(plusLoc.x - this.lineSize / 2, plusLoc.y);
        context.lineTo(plusLoc.x + this.lineSize / 2, plusLoc.y);

        context.stroke();

        context.beginPath();

        context.moveTo(plusLoc.x, plusLoc.y - this.lineSize / 2);
        context.lineTo(plusLoc.x, plusLoc.y + this.lineSize / 2);

        context.stroke();
    }
}