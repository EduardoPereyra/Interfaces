let btnCC = document.getElementById("cleanCanvas");
btnCC.addEventListener("click", cleanCanvas);
let btnRect = document.getElementById("rectangulo");
btnRect.addEventListener("click", rectangulo);
let btnCrIm = document.getElementById("crearImagen");
btnCrIm.addEventListener("click", crearImagen);
let btnCG = document.getElementById("crearImagenGradiente");
btnCG.addEventListener("click", crearImagenGradiente);
let btnM = document.getElementById("degradeMulticolor");
btnM.addEventListener("click", degradeMulticolor);

let btnCaIm1 = document.getElementById("cargarImagen1");
btnCaIm1.addEventListener("click", function () { cargarImagen("imagen1.jpg") });
let btnCaIm2 = document.getElementById("cargarImagen2");
btnCaIm2.addEventListener("click", function () { cargarImagen("imagen2.jpg") });
let btnCaIm3 = document.getElementById("cargarImagen3");
btnCaIm3.addEventListener("click", function () { cargarImagen("imagen3.jpg")});


let btnFI1 = document.getElementById("filtroImagen1");
btnFI1.addEventListener("click", function () { filtroImagen("imagen1.jpg") });
let btnFI2 = document.getElementById("filtroImagen2");
btnFI2.addEventListener("click", function () { filtroImagen("imagen2.jpg") });
let btnFI3 = document.getElementById("filtroImagen3");
btnFI3.addEventListener("click", function () { filtroImagen("imagen3.jpg") });

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

let w = 100;
let h = 100;
let matriz = [];


for (let x = 0; x < w; x++) { //creacion de la matriz
    matriz[x] = [];
    for (let y = 0; y < h; y++) {
        matriz[x][y] = Math.floor(Math.random()*100);
    }
    console.log(matriz[x])
}

function maximo() { //devuelve el maximo de la matriz completa
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

function maxParMinImpar() { //devuelve el maximo en las filas pares y el minimo en las impares
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

function promedio() { //devuelve el promedio de todas las filas guardados en un arreglo
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


function rectangulo() { //crea un rectangulo
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(10, 10, 100, 50);
}

function crearImagen() { //crea una imagen pixel por pixel
    imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            setPixel(imageData, x, y, 0, 255, 0, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function crearImagenGradiente() { //crea una imagen gradiente que va de negro a blanco de arriba hacia abajo
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

function setPixel(imageData, x, y, r, g, b, a) { //setea un color a un pixel con las cordenadas x e y
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}


function degradeMulticolor() { //crea una imagen en degrade desde negro hasta amarillo hasta rojo
    imageData = ctx.createImageData(canvas.width, canvas.height);
    let r = 0;
    let g = 0;
    let b = 0;

    for (let y = 0; y < imageData.height; y++) { //primera mitad
        for (let x = 0; x < imageData.width / 2 ; x++) {
            r = (x / imageData.height) * 255;
            g = (x / imageData.height) * 255;
            b = (x / imageData.height) * 0;
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }

    let aux = 255 / (imageData.width / 2); //sacar la cuenta de cuanto hay que ir sacando al verde

    for (let x = imageData.width / 2; x < imageData.width; x++) { //segunda mitad
        g = g - aux;
        for (let y = 0; y < imageData.height; y++) {
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function cargarImagen(nombre) { //carga una imagen mediante una direccion
    var image = new Image();
    image.src = nombre;

    image.onload = function () {
        myDrawImageMethod(this);
    }
}

function filtroImagen(nombre) { //carga una imagen y la pasa a blanco y negro
    var image = new Image();
    image.src = nombre;

    //image.crossOrigin='anonymous';
    image.onload = function () {
        myDrawImageMethod(this);

        imageData = ctx.getImageData(0, 0, image.width, image.height);

        for (let i = 0; i < imageData.data.length; i+=4) { //4 por que es rgba
            let r = imageData.data[i+0];
            let g = imageData.data[i+1];
            let b = imageData.data[i+2];

            let gris = (r + g + b) / 3;

            imageData.data[i+0] = gris;
            imageData.data[i+1] = gris;
            imageData.data[i+2] = gris;
        }
        ctx.putImageData(imageData, 0, 0);
    }
}

function cleanCanvas() { //limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function myDrawImageMethod(image) { //dibuja la imagen en el canvas
    if ((image.width > canvas.width) || (image.height > canvas.height)) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.drawImage(image, 0, 0, image.width, image.height);
    }
}