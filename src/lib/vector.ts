export default class Vector {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    
    public toString(): string {
        return "<" + this._x + ", " + this._y + ">";
    }

    public static Zero(): Vector {
        return new Vector(0, 0);
    }

    public scalarMultiply(scalar: number): Vector {
        return new Vector(this._x * scalar, this._y * scalar);
    }

    public add(vector: Vector): Vector {
        return new Vector(this._x + vector.x, this._y + vector.y);
    }

    public subtract(vector: Vector): Vector {
        return new Vector(this._x - vector.x, this._y - vector.y);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    set x(value: number) {
        this._x = value;
    }

    set y(value: number) {
        this._y = value;
    }

    public magnitude(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
}