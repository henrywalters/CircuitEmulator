import Vector from "../vector";

export default interface IClickable {
    containsPoint(point: Vector): boolean;
    onClickFn: (mousePos: Vector) => void;
}