import IDrawable from "./interface/iDrawable";
import IClickable from "./interface/iClickable";
import Vector from "./vector";
import Label from "./components/label";
import IGeometric, { Shape, geomContainsPoint } from "./interface/IGeometric";
import Input from "./input";

export interface ButtonOptions {
    width: number;
    height: number;
    text: string;

    fillColor?: string;
    textColor?: string;
    hoverColor?: string;
    borderColor?: string;
}

export default class Button<T> implements IDrawable, IGeometric, IClickable {
    visible: boolean = true;
    position: Vector;

    width: number;
    height: number;
    shape: Shape.Rectangle;

    value: T;

    label: Label;

    public onClick: () => void;

    constructor(position: Vector, value: T, options: ButtonOptions) {
        this.position = position;
        this.width = options.width;
        this.height = options.height;
    }

    handleInput(input: Input): void {
        
    }

    containsPoint(point: Vector): boolean {
        return geomContainsPoint(this, this.position, point);
    }

    onClickFn(): void {
        this.onClick();
    }

    draw(context: CanvasRenderingContext2D): void {

    }
}