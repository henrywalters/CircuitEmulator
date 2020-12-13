function demo() {

    const CE = window.CE;

    const app = document.getElementById("app");

    const display = new CE.Display(app, window.innerWidth, window.innerHeight);
    const input = new CE.Input();

    const circuit = new CE.Circuit(display, input);

    let fpsLabel = new CE.Label(new CE.Vector(5, 15));
    let battery = new CE.Battery(new CE.Vector(20, 50));
    let led = new CE.LED("#4fe24d", new CE.Vector(230, 150));
    circuit.addComponent(led);
    circuit.addComponent(new CE.Demultiplexer(20, 70, new CE.Vector(10, 10), 2));

    fpsLabel.text = "FPS: 0";

    display.addElement(fpsLabel);

    let fps = 0;
    let fpsSum = 0; 
    let ticks = 0;

    let sampleSize = 50;

    circuit.addComponent(battery);

    console.log(battery);

    let bNode = circuit.getNode(battery.uid);
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
}

demo();