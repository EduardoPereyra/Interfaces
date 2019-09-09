import { Figura } from "./figura.js";

let btnCC = document.getElementById("cleanCanvas");
btnCC.addEventListener("click", cleanCanvas);
let btnCP = document.getElementById("cerrarPoligono");
btnCP.addEventListener("click", cerrarPoligono);


var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.onclick = function () { cargarCoordenadas(event); };
c.onmousedown = function () { seleccionarArista(event); }
c.onmousemove = function () { moverArista(event); }
c.onmouseup = function () { soltarArista(); }
c.ondblclick = function () { borrarArista(event); }
window.onkeydown = function () { confirmarTecla(event); }
window.onkeypress = function () { cambiarColor(event); }
window.onkeyup = function () { color = false; }


let figuras = [];
let figura = new Figura();
let objetoActual = null;
let posCentroInicialX = 0;
let posCentroInicialY = 0;
let centro = false;
let color = false;


function cargarCoordenadas(event) { //carga las cordenadas donde esta el mouse
    if (esVacio(event)) {
        figura.cargarCoordenadas(event, ctx);
    }
}

function cleanCanvas() { //limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    figuras = [];
    figura = new Figura();
}

function cerrarPoligono() { //cierra el poligono, une la ultima arista con la primera
    figura.cerrarPoligono(ctx);    
    figuras.push(figura);
    figura = new Figura();
}

function borrarArista(event) { //borra una arista marcada por el mouse
    if (!esVacio(event)) {
        if (figura.isInside(event.layerX, event.layerY) != null) { //pregunta aparte por que la actual no esta en el arreglo
            figura.delete(figura.isInside(event.layerX, event.layerY));
            actualizar();
        } else if (figuras.length > 0) { //pregunta a todas
            for (let i = 0; i < figuras.length; i++) {
                if (figuras[i].isInside(event.layerX, event.layerY) != null) {
                    figuras[i].delete(figuras[i].isInside(event.layerX, event.layerY));
                    actualizar();
                }
            }
        }
    }
}

function esVacio(event) { //pregunta si la posicion es vacia
    if (figura.isInside(event.layerX, event.layerY) != null) { //pregunta aparte por que la actual no esta en el arreglo
        return false;
    } else if (figuras.length > 0) { //pregunta a todas
        for (let i = 0; i < figuras.length; i++) {
            if (figuras[i].isInside(event.layerX, event.layerY) || figuras[i].isCentro(event.layerX, event.layerY)) {
                return false;
            }
        }
    }
    return true;
}

function actualizar() { //actualiza el canvas volviendo a cargar todo
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    figura.drawAll(ctx);
    for (let i = 0; i < figuras.length; i++) {
        figuras[i].drawAll(ctx);
    }
}

function seleccionarArista(event) { //selecciona una arista
    for (let i = 0; i < figuras.length; i++) {
        if (figuras[i].isInside(event.layerX, event.layerY) != null) {
            objetoActual = figuras[i].isInside(event.layerX, event.layerY);
            return;
        }
    }
    if (figura.isInside(event.layerX, event.layerY) != null) {
        objetoActual = figura.isInside(event.layerX, event.layerY);
    }
    if (objetoActual == null) {
        seleccionarCentro(event);
    }
}

function seleccionarCentro(event) { //selecciona el centro de un poligono
    for (let i = 0; i < figuras.length; i++) {
        if (figuras[i].isCentro(event.layerX, event.layerY) != null) {
            objetoActual = figuras[i].isCentro(event.layerX, event.layerY);
            posCentroInicialX = event.layerX;
            posCentroInicialY = event.layerY;
            centro = true;
            return;
        }
    }
    if (figura.isInside(event.layerX, event.layerY) != null) {
        objetoActual = figura.isCentro(event.layerX, event.layerY);
        posCentroInicialX = event.layerX;
        posCentroInicialY = event.layerY;
    }

}

function moverArista(event) { //mueve una arista ya sea centro o no
    if (objetoActual != null) {
        if (centro) {
            let posInicialMoverX = posCentroInicialX - event.layerX;
            let posInicialMoverY = posCentroInicialY - event.layerY;
            objetoActual.corrimiento(posInicialMoverX, posInicialMoverY);
            actualizar();
        } else {
            objetoActual.setX(event.layerX);
            objetoActual.setY(event.layerY);
            actualizar();
        }
    }
    posCentroInicialX = event.layerX;
    posCentroInicialY = event.layerY;
}

function soltarArista() { //suelta la arista y vuelve todo a null y false
    objetoActual = null;
    centro = false;
    posCentroInicialX = 0;
    posCentroInicialY = 0;
}

function confirmarTecla(event) { //confirmar que la tecla ingresada es la letra C
    let key = event.key;
    if (key == 'c') {
        color = true;
    }
}


function cambiarColor() { //cambia el color girando la rueda del mouse si color es true
    if (color) {
        if (document.documentElement.scrollTop > 100) {
            for (let i = 0; i < figuras.length; i++) {
                figuras[i].cambiarColor(true);
            }
            figura.cambiarColor(true);
        } else {
            for (let i = 0; i < figuras.length; i++) {
                figuras[i].cambiarColor(false);
            }
            figura.cambiarColor(false);
        }
        actualizar();
    }
}