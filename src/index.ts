import Display from './lib/display';
import Input from './lib/input';
import LED from './lib/components/led';
import Vector from './lib/vector';
import Wire from './lib/components/wire';
import Circuit from './lib/circuit';
import Battery from './lib/components/battery';
import Demultiplexer from './lib/components/demultiplexer';
import Label from './lib/components/label';

const app = document.getElementById("app");

const display = new Display(app, 800, 800);
const input = new Input();

const circuit = new Circuit(display, input);

let battery = new Battery(new Vector(50, 50));

let demux = new Demultiplexer(50, 200, new Vector(150, 70), 6);

let led = new LED("#4fe24d", new Vector(230, 150));
let led2 = new LED("#4fe24d", new Vector(250, 300));
let led3 = new LED("#4fe24d", new Vector(450, 450));
let led4 = new LED("#4fe24d", new Vector(450, 200));
let led5 = new LED("#4fe24d", new Vector(600, 300));
let led6 = new LED("#4fe24d", new Vector(650, 400));

let fpsLabel = new Label(new Vector(5, 15));
fpsLabel.text = "FPS: 0";

circuit.addComponent(battery);
circuit.addComponent(demux);
//circuit.addComponent(led);
circuit.addComponent(led4);
circuit.addComponent(led5);
circuit.addComponent(led6);

let bNode = circuit.getNode(battery.uid);

//let node1 = circuit.getNode(led.uid);
//let node2 = circuit.getNode(led2.uid);
//let node3 = circuit.getNode(led3.uid);
let node4 = circuit.getNode(led4.uid);
let node5 = circuit.getNode(led5.uid);
let node6 = circuit.getNode(led6.uid);
let dNode = circuit.getNode(demux.uid);

//circuit.connectSimple(bNode, dNode);

//circuit.connect(dNode, 0, node4, 0);
//circuit.connect(dNode, 1, node5, 0);

//circuit.connectSimple(node5, node6);

//circuit.connectSimple(node6, bNode);

//

display.addElement(fpsLabel);

let fps = 0;
let fpsSum = 0; 
let ticks = 0;

let sampleSize = 50;

circuit.setSource(bNode);

input.mouseDown = _ => {
    circuit.checkForLeadClicks();
}

function loop() {
    let start = window.performance.now();
    requestAnimationFrame(loop);
    display.clear();

    circuit.loop();

    //

    display.render();

    ticks += 1; 

    let end = window.performance.now();

    if (ticks % sampleSize === 0) {
        fps = Math.round(fpsSum / sampleSize);
        fpsLabel.text = "FPS: " + fps;
        fpsSum = 0;
    } else {
        fpsSum += 1000 / (end - start);
    }
       
}
    
loop();