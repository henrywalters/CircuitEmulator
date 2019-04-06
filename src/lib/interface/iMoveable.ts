import Vector from "../vector";

export interface IMoveable {
    move(delta: Vector): void;
    moveTo(position: Vector): void;
}

export function IsMoveable(object: any): object is IMoveable {
    return 'move' in object && 'moveTo' in object;
}