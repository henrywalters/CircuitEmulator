import Vector from "./vector";
import IGeometric, { Shape, geomContainsPoint } from "./interface/IGeometric";
import IDrawable from "./interface/iDrawable";
import IClickable from "./interface/iClickable";

export enum LeadStates {
    Disconnected,
    Connected,
    Connecting,
}

//Match this exactly to lead states in length
const LeadStateColors: string[] = [
    "#ffffff",
    "#0c0cff",
    "#8e8e8e"
];

export const LEAD_RADIUS = 7.5;

export class Lead implements IDrawable, IGeometric, IClickable {
    private _position: Vector;
    private _on: boolean;
    private _connected: boolean;

    private _onHook: () => void;
    private _offHook: () => void;

    onClickFn: (mousePos: Vector) => void;

    visible: boolean = true;

    width: number = LEAD_RADIUS * 2;
    height: number = LEAD_RADIUS * 2;
    shape: Shape = Shape.Circle;

    public uid: string = "";

    public state: LeadStates = LeadStates.Disconnected;
    
    constructor(position: Vector) {
        this._position = position;
        this._connected = false;
        this._on = false;
        this._onHook = () => {};
        this._offHook = () => {};

        this.onClickFn = (mousePos: Vector) => {
            
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
        this.state = this._connected ? LeadStates.Connected : LeadStates.Disconnected;
    }
    
    set onHook(callback: () => void) {
        this._onHook = callback;
    }

    set offHook(callback: () => void) {
        this._offHook = callback;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = LeadStateColors[this.state];
        context.arc(this.position.x, this.position.y, this.width / 2, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }
    
    containsPoint(point: Vector): boolean {
        return geomContainsPoint(this, this.position, point);
    }
}