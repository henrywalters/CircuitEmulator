import Vector from "../vector";

export default interface IDrawable {
    visible: boolean;
    position: Vector;
    draw(context: CanvasRenderingContext2D): void;
}

export function IsDrawable(object: any): object is IDrawable {
    return 'draw' in object;
}