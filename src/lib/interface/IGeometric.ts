import Vector from "../vector";

export enum Shape {
    Rectangle,
    Circle,
}

export default interface IGeometric {
    width: number;
    height: number;
    shape: Shape;
}

export function geomContainsPoint(geom: IGeometric, geomPos: Vector, pointPos: Vector): boolean {
    switch(geom.shape) {
        case Shape.Rectangle:
            return  (pointPos.x >= geomPos.x) && 
                    (pointPos.x <= geomPos.x + geom.width) &&
                    (pointPos.y >= geomPos.y) &&
                    (pointPos.y <= geomPos.y + geom.height);
        case Shape.Circle:
            const radius = geom.width / 2.0;
            const delta = pointPos.subtract(geomPos);
            return delta.magnitude() <= radius;
    }
}

export function IsGeometric(object: any): object is IGeometric {
    return 'width' in object && 'height' in object && 'shape' in object;
}