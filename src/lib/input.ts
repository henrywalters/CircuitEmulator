import Vector from "./vector";
import IInputHandler from "./interface/iInputHandler";

export default class Input {
    mousePos: Vector;

    mouseUp: (event: MouseEvent) => void;
    mouseDown: (event: MouseEvent) => void;
    click: (event: MouseEvent) => void;

    private handlers: IInputHandler[] = [];

    private clickEvent(event: MouseEvent): void {
        this.handlers.forEach(handler => {
            handler.onClick(this);
        })
        this.click(event);
    }

    private mouseUpEvent(event: MouseEvent): void {
        this.handlers.forEach(handler => {
            handler.onMouseup(this);
        })
        this.mouseUp(event);
    }

    private mouseDownEvent(event: MouseEvent): void {
        this.handlers.forEach(handler => {
            handler.onMousedown(this);
        })
        this.mouseDown(event);
    }

    public addHandler(handler: IInputHandler): void {
        this.handlers.push(handler);
    }

    constructor() {
        this.mousePos = Vector.Zero();
        let canvas = document.getElementById("circuit-emulator");
        if (canvas instanceof HTMLCanvasElement) {
            const rect = canvas.getBoundingClientRect();
            canvas.addEventListener("mousemove", event => {
                this.mousePos.x = event.clientX - rect.left;
                this.mousePos.y = event.clientY - rect.top;
            })

            this.mouseUp = () => {};
            this.mouseDown = () => {};
            this.click = () => {};

            canvas.addEventListener("click", event => this.clickEvent(event));
            canvas.addEventListener("mouseup", event => this.mouseUpEvent(event));
            canvas.addEventListener("mousedown", event => this.mouseDownEvent(event));
        } else {
            throw new Error("circuit-emulator canvas element does not exist");
        }
    }
}