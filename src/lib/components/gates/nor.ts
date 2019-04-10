import BinaryMultiplexer from "../binaryMultiplexer";
import IDrawable from "../../interface/iDrawable";
import Vector from "../../vector";
import { MoveLeadsRelativeToComponent } from "../../interface/iElectronic";
import { LEAD_RADIUS } from "../../lead";

const SQROOT_THREE = 1.73205080757;

const TIP_RADIUS = 3;

export default class Nor extends BinaryMultiplexer implements IDrawable {

    visible: boolean = true;

    private radius: number = this.height;
    private flat: number = 10;

    private x1: number;
    private x2: number;
    private x3: number;
    private x4: number;
    private x5: number;
    private x6: number;

    private y1: number;
    private y2: number;
    private y3: number;
    private y4: number;
    private y5: number;
    private y6: number;


    constructor(position: Vector) {
        super(position);

        this.updateCalculations();
    }

    private updateCalculations() {
        //shamelessly ripped from http://www.science.smith.edu/dftwiki/index.php/Tutorial:_Drawing_Basic_Logic_Gates_with_GWT
        //Which has a nice code sample for drawing the logic gates

        this.y1 = this.position.y - this.radius / 2;
        this.y2 = this.y1;
        this.y3 = this.position.y;
        this.y4 = this.y2 + this.height;
        this.y5 = this.y4;
        this.y6 = this.position.y;

        this.x6 = this.position.x - this.flat - this.radius;
        this.x1 = this.x6 + this.radius * SQROOT_THREE / 2;
        this.x5 = this.x1;
        this.x2 = this.position.x;
        this.x4 = this.position.x;
        this.x3 = this.position.x + this.radius * SQROOT_THREE / 2;

        this.inputA.position.x = this.x6 + this.radius * 0.96592582628; // cos( PI/12 )
        this.inputA.position.y = this.position.y - this.radius * 0.2588190451; // sin( PI/12 )

        this.inputB.position.x = this.inputA.position.x;
        this.inputB.position.y = this.position.y + this.radius * 0.2588190451; // sin( PI/12 )

        this.output.position.x = this.x3 + LEAD_RADIUS + TIP_RADIUS * 2;
        this.output.position.y = this.y3;
    }

    updateOutput() {
        this.output.on = !(this.inputA.on || this.inputB.on);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
        
        context.moveTo(this.x2, this.y2);
        context.arc(this.x4, this.y4, this.radius, 3 * Math.PI / 2, Math.PI * 2 - Math.PI / 6);
        context.stroke();

        context.moveTo(this.x3, this.y3);
        context.arc(this.x2, this.y2, this.radius, Math.PI / 6, Math.PI / 2);
        context.stroke();

        context.moveTo(this.x4, this.y4);
        context.lineTo(this.x5, this.y5);
        context.stroke();

        context.moveTo(this.x1, this.y1);
        context.arc(this.x6, this.y6, this.radius, -Math.PI / 6, Math.PI / 6);
        context.stroke();

        context.beginPath();
        context.arc(this.x3 + TIP_RADIUS / 2, this.y3, TIP_RADIUS, 0, 2 * Math.PI);
        context.stroke();
    }

    move(delta: Vector): void {
        this.position = this.position.add(delta);
        this.updateCalculations();
        MoveLeadsRelativeToComponent(this, delta);
    }
}