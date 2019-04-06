import IDrawable from './interface/iDrawable';

export default class Display {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    private elements: Array<IDrawable>;

    constructor(container: HTMLElement, width: number, height: number) {
        this.width = width;
        this.height = height;
        this._canvas = document.createElement("canvas");
        this._canvas.id = "circuit-emulator";
        this._canvas.width = width;
        this._canvas.height = height;

        this._context = this._canvas.getContext("2d");

        this.elements = [];

        container.appendChild(this._canvas);
    }

    addElement(element: IDrawable): void {
        this.elements.push(element);
    }

    addElements(elements: Array<IDrawable>): void {
        this.elements = [...this.elements, ...elements];
    }

    clear() {
        this._context.clearRect(0, 0, this.width, this.height);
    }

    render() {
        this.elements.forEach(element => {
            if (element.visible) {
                this._context.save();
                element.draw(this._context);
                this._context.restore();
            }
        })
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }
}