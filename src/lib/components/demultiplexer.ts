import BaseComponent from "./base";
import { Lead } from "../lead";
import IDrawable from "../interface/iDrawable";
import Vector from "../vector";
import IGeometric, { Shape } from "../interface/IGeometric";

export default class Demultiplexer extends BaseComponent implements IDrawable, IGeometric {
    visible: boolean = true;
    position: Vector;
    width: number;
    height: number;
    shape: Shape = Shape.Rectangle;

    constructor(width: number, height: number, position: Vector, outputs: number) {
        super();
        this.position = position;
        this.width = width;
        this.height = height;
        this.pushInput(new Lead(this.position.add(new Vector(0, this.height / 2))));

        for (let i = 0; i < outputs; i++) {
            this.pushOutput(new Lead(this.position.add(new Vector(this.width, (i + 1) * (this.height / (outputs + 1))))));
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.stroke();
    }

    updateOutput(): void {
        this.outputs.forEach(output => {
            output.on = this.input(0).on;
        })
    }

}