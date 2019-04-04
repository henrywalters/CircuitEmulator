import IDrawable from "../interface/iDrawable";
import Vector from "../vector";

export default class Label implements IDrawable {
    visible: boolean = true;
    position: Vector;

    private _text: string = "";
    private _font: string = "Arial";
    private _fontSize: number = 16;

    constructor(position: Vector) {
        this.position = position;
    }

    get text(): string {
        return this._text;
    }

    set text(msg: string) {
        this._text = msg;
    }

    set font(font: string) {
        this._font = font;
    }

    set fontSize(fontSize: number) {
        this._fontSize = fontSize;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.font = this._fontSize + "px " + this._font;
        context.fillText(this._text, this.position.x, this.position.y);
    }
}