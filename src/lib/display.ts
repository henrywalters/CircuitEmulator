import IDrawable from './interface/iDrawable';

export default class Display {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    public width: number;
    public height: number;

    private elements: Array<IDrawable>;

    constructor(container: HTMLElement) {
        const rawBWidth = container.style.borderWidth;
        const bWidth = (typeof rawBWidth === 'number' ? 
            container.style.borderWidth : (typeof rawBWidth === 'string' ? 
                rawBWidth.slice(0, rawBWidth.length - 2) : 0));
        console.log(bWidth, container.style.borderWidth);
        this.width = container.offsetWidth - 4 - 2 * (typeof bWidth === 'number' ? bWidth : 0);
        this.height = container.offsetHeight - 4 - 2 * (typeof bWidth === 'number' ? bWidth : 0);
        console.log(container.offsetWidth, )
        this._canvas = document.createElement("canvas");
        this._canvas.id = "circuit-emulator";
        this._canvas.width = this.width;
        this._canvas.height = this.height;

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