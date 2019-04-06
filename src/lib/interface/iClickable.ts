import Vector from "../vector";
import { IsDrawable } from "./iDrawable";
import { geomContainsPoint, IsGeometric } from "./IGeometric";

export default interface IClickable {
    containsPoint(point: Vector): boolean;
    onClickFn: (mousePos: Vector) => void;
}

export function IsClickable(object: any): object is IClickable {
    return ('containsPoint' in object && 'onClickFn' in object); 
}

export function IsClickConvertable(object: any): boolean {
    return IsDrawable(object) && IsGeometric(object);
}

export function MakeClickable(object: any, onClickFn: (mousePos: Vector) => void): any {
    if (IsClickable(object)) {
        return object;
    } else if (IsGeometric(object) && IsDrawable(object)) {
        object['containsPoint'] = (point: Vector) => {
            return geomContainsPoint(object, object.position, point);
        }

        object['onClickFn'] = onClickFn;

        if (IsClickable(object)) {
            return object;
        } else {
            throw new Error("Failed to convert IGeometric & IDrawable object to clickable object");
        }
    } else {
        throw new Error("Object must be IGeometric & IDrawable to be converted to a clickable object");
    }
}