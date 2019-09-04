import { Circle } from "./Circle.js";

let btnCC = document.getElementById("cleanCanvas");
btnCC.addEventListener("click", cleanCanvas);


var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.addEventListener("mousedown", function () { cargarCoordenadas(event); });


let circulos = [];

function cargarCoordenadas(event) {
    console.log("coordenadas: ");
    console.log(event.clientX);
    console.log(event.clientY);

    let circle = new Circle(event.clientX, event.clientY, 10, '#ff0000');
    circle.draw(ctx)

    if (circulos.length > 0) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(event.clientX, event.clientY);
        ctx.lineTo(circulos[circulos.length-1].getX(), circulos[circulos.length-1].getY());
        ctx.stroke();
    }

    circulos.push(circle);  
}

function cleanCanvas() { //limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

