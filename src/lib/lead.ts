import Vector from "./vector";
import IGeometric, { Shape, geomContainsPoint } from "./interface/IGeometric";
import IDrawable from "./interface/iDrawable";
import IClickable from "./interface/iClickable";

export class Lead implements IDrawable, IGeometric, IClickable {
    private _position: Vector;
    private _on: boolean;
    private _connected: boolean;

    private _onHook: () => void;
    private _offHook: () => void;

    onClickFn: (mousePos: Vector) => void;

    visible: boolean = true;

    width: number = 15;
    height: number = 15;
    shape: Shape = Shape.Circle;
    
    constructor(position: Vector) {
        this._position = position;
        this._connected = false;
        this._on = false;
        this._onHook = () => {};
        this._offHook = () => {};

        this.onClickFn = (mousePos: Vector) => {
            console.log(mousePos)
        }
    }

    get position(): Vector {
        return this._position;
    }

    set position(position: Vector) {
        this._position = position;
    }

    get on(): boolean {
        return this._on;
    }

    set on(state: boolean) {
        if (state != this._on) {
            if (state) {
                this._onHook();
                this._on = true;
            } else {
                this._offHook();
                this._on = false;
            }
        }
    }

    get connected(): boolean {
        return this._connected;
    }

    set connected(state: boolean) {
        this._connected = state;
    }
    
    set onHook(callback: () => void) {
        this._onHook = callback;
    }

    set offHook(callback: () => void) {
        this._offHook = callback;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.width / 2, 0, 2 * Math.PI);
        context.stroke();
    }
    
    containsPoint(point: Vector): boolean {
        return geomContainsPoint(this, this.position, point);
    }
}