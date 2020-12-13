import Display from './lib/display';
import Input from './lib/input';
import LED from './lib/components/led';
import Vector from './lib/vector';
import Wire, { WireDrawModes } from './lib/components/wire';
import Circuit from './lib/circuit';
import Battery from './lib/components/battery';
import Demultiplexer from './lib/components/demultiplexer';
import Label from './lib/components/label';
import Multiplexer from './lib/components/multiplexer';
import And from './lib/components/gates/and';
import Nand from './lib/components/gates/nand';
import Or from './lib/components/gates/or';
import { Switch } from './lib/components/switch';
import Nor from './lib/components/gates/nor';

const CE = {
    Display,
    Input,
    Circuit,
    Vector,

    Wire,
    WireDrawModes,
    LED,
    Battery,
    Demultiplexer,
    Label,
    Multiplexer,
    And,
    Nand,
    Or,
    Switch,
    Nor,
}

window['CE'] = CE;

export default CE;
/*
const app = document.getElementById("app");

const display = new Display(app, window.innerWidth, window.innerHeight);
const input = new Input();

const circuit = new Circuit(display, input);

let battery = new Battery(new Vector(20, 50));

let mux = new Multiplexer(20, 300, new Vector(display.width - 80, display.height - 340), 10);
let demux = new Demultiplexer(20, 300, new Vector(20, display.height - 340), 10);

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
circuit.addComponent(mux);
circuit.addComponent(led);
circuit.addComponent(led2);
circuit.addComponent(led3);
circuit.addComponent(led4);
circuit.addComponent(led5);
circuit.addComponent(led6);

circuit.addComponent(new Demultiplexer(20, 70, new Vector(500, 500), 2));
circuit.addComponent(new Demultiplexer(20, 70, new Vector(500, 520), 2));

circuit.addComponent(new Switch(new Vector(500, 500)));
circuit.addComponent(new Switch(new Vector(500, 500)));

circuit.addComponent(new Switch(new Vector(500, 500)));

circuit.addComponent(new Switch(new Vector(500, 500)));


circuit.addComponent(new And(new Vector(100, 100)));
circuit.addComponent(new And(new Vector(100, 100)));
circuit.addComponent(new And(new Vector(100, 100)));
circuit.addComponent(new Nand(new Vector(200, 200)));
//circuit.addComponent(new Or(new Vector(300, 300)));
circuit.addComponent(new Nor(new Vector(350, 350)));
circuit.addComponent(new Nor(new Vector(350, 400)));

let bNode = circuit.getNode(battery.uid);

//let node1 = circuit.getNode(led.uid);
//let node2 = circuit.getNode(led2.uid);
//let node3 = circuit.getNode(led3.uid);
let node4 = circuit.getNode(led4.uid);
let node5 = circuit.getNode(led5.uid);
let node6 = circuit.getNode(led6.uid);
let dNode = circuit.getNode(demux.uid);
let mNode = circuit.getNode(mux.uid);

circuit.connectSimple(mNode, bNode);

circuit.connectSimple(bNode, dNode);

bNode.outputConnections.forEach(connection => {
    connection.wire.drawMode = WireDrawModes.HorizontalFirst;
})

bNode.inputConnections.forEach(connection => {
    connection.wire.drawMode = WireDrawModes.VerticalFirst;
})


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

input.addHandler(circuit);

function loop() {
    let start = window.performance.now();
    requestAnimationFrame(loop);
    display.clear();

    circuit.loop();

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
*/