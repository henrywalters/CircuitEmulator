import IDrawable from "./interface/iDrawable";
import Vector from "./vector";
import IElectronic from "./interface/iElectronic";

export default class ComponentPanel implements IDrawable {
    visible: boolean = true;
    position: Vector;

    constructor(components: IElectronic) {

    }

    draw(context: CanvasRenderingContext2D): void {
        
    }
}