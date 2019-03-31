import Display from './lib/display';
import Input from './lib/input';
import LED from './lib/components/led';
import Vector from './lib/vector';
import Wire from './lib/components/wire';
import Circuit from './lib/circuit';
import Battery from './lib/components/battery';

const app = document.getElementById("app");

const display = new Display(app, 800, 600);
const input = new Input();

const circuit = new Circuit(display);

let battery = new Battery(new Vector(50, 50));

let led = new LED("#4fe24d", new Vector(150, 150));
let led2 = new LED("#4fe24d", new Vector(250, 300));
let led3 = new LED("#4fe24d", new Vector(450, 450));

circuit.addComponent(battery);
circuit.addComponent(led);
circuit.addComponent(led2);
circuit.addComponent(led3);

let bNode = circuit.getNode(battery.uid);
let node1 = circuit.getNode(led.uid);
let node2 = circuit.getNode(led2.uid);
let node3 = circuit.getNode(led3.uid);

console.log(node1, node2, node3);

circuit.connectSimple(bNode, node1);
circuit.connectSimple(node1, node2);
circuit.connectSimple(node2, node3);
circuit.connectSimple(node3, node1);
circuit.connectSimple(node3, bNode);

function loop() {
    requestAnimationFrame(loop);
    display.clear();
    display.render();
}
    
loop();