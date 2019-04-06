import BaseComponent from "./base";
import { Lead, LEAD_RADIUS } from "../lead";
import IDrawable from "../interface/iDrawable";
import Vector from "../vector";
import IGeometric, { Shape, geomContainsPoint } from "../interface/IGeometric";
import { MoveLeadsRelativeToComponent } from "../interface/iElectronic";

export default class Multiplexer extends BaseComponent implements IDrawable, IGeometric {
    visible: boolean = true;
    width: number;
    height: number;
    shape: Shape = Shape.Rectangle;

    constructor(width: number, height: number, position: Vector, inputs: number) {
        super();
        this.position = position;
        this.width = width;
        this.height = height;
        this.pushOutput(new Lead(this.position.add(new Vector(this.width + LEAD_RADIUS, this.height / 2))));

        for (let i = 0; i < inputs; i++) {
            this.pushInput(new Lead(this.position.add(new Vector(-1 * LEAD_RADIUS, (i + 1) * (this.height / (inputs + 1))))));
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.stroke();
    }

    updateOutput(): void {
        this.inputs.forEach(input => {
            input.on = this.output(0).on;
        })
    }
}
