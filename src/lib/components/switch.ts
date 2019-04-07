import Simple from "./simple";
import IDrawable from "../interface/iDrawable";
import IGeometric, { Shape, geomContainsPoint } from "../interface/IGeometric";
import IClickable from "../interface/iClickable";
import Vector from "../vector";
import Input from "../input";

class SwitchButton implements IGeometric {
    public width: number;
    public height: number;
    public shape: Shape = Shape.Rectangle;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

const SWITCH_WIDTH_RATIO = 0.65;
const SWITCH_HEIGHT_RATIO = 0.50;

export function IsSwitch(object: any): object is Switch {
    return 'isPointInSwitch' in object && 'toggle' in object;
}

export class Switch extends Simple implements IDrawable, IGeometric {
    private _closed: boolean = false; 
    private switchBtn: SwitchButton;
    private switchDelta: Vector;

    public name: string = "switch";

    public visible: boolean = true;
    public shape: Shape = Shape.Rectangle;
    public width: number = 70;
    public height: number = 30;
    public position: Vector;

    updateOutput() {
        this.output.on = this.input.on && this._closed;
    }

    constructor(position: Vector) {
        super();
        this.position = position;
        this.switchBtn = new SwitchButton(this.width * SWITCH_WIDTH_RATIO, this.height * SWITCH_HEIGHT_RATIO);
        this.switchDelta = new Vector(this.width - this.switchBtn.width, this.height - this.switchBtn.height);
        this.input.position = this.position.add(new Vector(0, this.height / 2));
        this.output.position = this.position.add(new Vector(this.width, this.height / 2));
    }

    get closed(): boolean {
        return this._closed;
    }

    set closed(state: boolean) {
        this._closed = state;
    }

    toggle() {
        this._closed = !this._closed;
    }

    isPointInSwitch(point: Vector): boolean {
        return geomContainsPoint(this.switchBtn, this.position.add(new Vector(this.switchBtn.width / 2, this.switchBtn.height / 2 )), point);
    }

    draw(context: CanvasRenderingContext2D): void {

        if (this._closed) {
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(this.position.x, this.position.y + this.height / 2);
            context.lineTo(this.position.x + this.switchDelta.x / 2, this.position.y + this.height / 2);
            context.stroke();

            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(this.position.x + this.switchDelta.x / 2, this.position.y + this.height / 2);
            context.lineTo(this.position.x + this.switchDelta.x / 2 + this.switchBtn.width, this.position.y + this.height / 2);
            context.stroke();
            
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(this.position.x + this.switchDelta.x / 2 + this.switchBtn.width, this.position.y + this.height / 2);
            context.lineTo(this.position.x + this.width, this.position.y + this.height / 2);
            context.stroke();
        } else {

            let x = this.switchBtn.width * Math.cos(Math.sinh(this.height / (2 * this.switchBtn.width)));

            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(this.position.x, this.position.y + this.height / 2);
            context.lineTo(this.position.x + this.switchDelta.x / 2, this.position.y + this.height / 2);
            context.stroke();

            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(this.position.x + this.switchDelta.x / 2, this.position.y + this.height / 2);
            context.lineTo(this.position.x + this.switchDelta.x / 2 + x, this.position.y);
            context.stroke();
            
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(this.position.x + this.switchDelta.x / 2 + x, this.position.y + this.height / 2);
            context.lineTo(this.position.x + this.width, this.position.y + this.height / 2);
            context.stroke();
        }
    }
}