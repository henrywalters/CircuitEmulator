import IDrawable from './interface/iDrawable';

export default class Display {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    private elements: Array<IDrawable>;

    constructor(container: HTMLElement, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
        this.canvas.id = "circuit-emulator";
        this.canvas.width = width;
        this.canvas.height = height;

        this.context = this.canvas.getContext("2d");

        this.elements = [];

        container.appendChild(this.canvas);
    }

    addElement(element: IDrawable): void {
        this.elements.push(element);
    }

    addElements(elements: Array<IDrawable>): void {
        this.elements = [...this.elements, ...elements];
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    render() {
        this.elements.forEach(element => {
            if (element.visible) {
                this.context.save();
                element.draw(this.context);
                this.context.restore();
            }
        })
    }
}