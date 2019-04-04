import Vector from "./vector";

export default class Input {
    mousePos: Vector;

    mouseUp: (event: MouseEvent) => void;
    mouseDown: (event: MouseEvent) => void;

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

            canvas.addEventListener("mouseup", event => this.mouseUp(event));
            canvas.addEventListener("mousedown", event => this.mouseDown(event));
        } else {
            throw new Error("circuit-emulator canvas element does not exist");
        }
    }
}