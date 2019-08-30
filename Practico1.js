let btnCC = document.getElementById("cleanCanvas");
btnCC.addEventListener("click", cleanCanvas);
let btnRect = document.getElementById("rectangulo");
btnRect.addEventListener("click", rectangulo);
let btnCrIm = document.getElementById("crearImagen");
btnCrIm.addEventListener("click", crearImagen);
let btnCaIm = document.getElementById("cargarImagen");
btnCaIm.addEventListener("click", cargarImagen);
let btnCG = document.getElementById("crearImagenGradiente");
btnCG.addEventListener("click", crearImagenGradiente);
let btnM = document.getElementById("degradeMulticolor");
btnM.addEventListener("click", degradeMulticolor);
let btnFI = document.getElementById("filtroImagen");
btnFI.addEventListener("click", filtroImagen);



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let w = 5;
let h = 5;
let matriz = [];


for (let y = 0; y < h; y++) {
    matriz[y] = [];
    for (let x = 0; x < w; x++) {
        //matriz[x][y] = Math.floor(Math.random()*100);
    }
}

function maximo() {
    let maximo = -1;
    for (let y = 0; y < h; y++) {
        matriz[y] = [];
        for (let x = 0; x < w; x++) {
            if (matriz[x][y] > maximo) {
                maximo = matriz[x][y]
            }
        }
    }   
    return maximo;
}

function maxParMinImpar() {
    let max = -1;
    let min = -1;

    for (let y = 0; y < h; y++) {
        matriz[y] = [];
        for (let x = 0; x < w; x++) {
            if ((matriz[x][y] > max)&&(y%2 == 0)) {
                max = matriz[x][y]
            }else if ((matriz[x][y] < min)&& (y % 2 > 0)) {
                min = matriz[x][y]
            }
        }
    } 

    let respuestas = [max,min];
    return respuestas;
}

function promedio() {
    let respuesta = [];
    let aux;

    for (let y = 0; y < h; y++) {
        aux = 0;
        for (let x = 0; x < w; x++) {
            aux += matriz[x][y];
        }
        respuesta.push(aux / w);
    }
    return respuesta;
}


function rectangulo() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(10, 10, 100, 50);
}

function crearImagen() {
    imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            setPixel(imageData, x, y, 0, 255, 0, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function crearImagenGradiente() {
    imageData = ctx.createImageData(canvas.width, canvas.height);
    let r, g, b = 0;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            r = (y / imageData.height) * 255;
            g = (y / imageData.height) * 255;
            b = (y / imageData.height) * 255;
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}


function degradeMulticolor() {
    imageData = ctx.createImageData(canvas.width, canvas.height);
    let r, g, b = 0;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width /2 ; x++) {
            r = (x / imageData.height) * 255;
            g = (x / imageData.height) * 255;
            b = (x / imageData.height) * 0;
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);

}

function cargarImagen() {
    var image = new Image();
    image.src = "imagen.jpg";

    image.onload = function () {
        myDrawImageMethod(this);
    }

    function myDrawImageMethod(image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
}

function filtroImagen() {
    var image = new Image();
    image.src = "imagen.jpg";

    image.onload = function () {
        ctx.drawImage(this, 0, 0);

        imageData = ctx.getImageData(0, 0, this.width, this.height);


        ctx.putImageData(ImageData, 0, 0);
    }
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}