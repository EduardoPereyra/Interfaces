import { Arista } from "./arista.js";

export class Figura {
    constructor() {
        this.aristas = [];
        this.centro;
        this.cerrado = false;
    }

    cargarCoordenadas(event,ctx) { //carga las cordenadas donde esta el mouse
        let mouseX = event.layerX;
        let mouseY = event.layerY;
        this.drawNew(ctx, mouseX, mouseY);
    }

    cerrarPoligono(ctx) { //cierra el poligono, une la ultima arista con la primera
        if (this.aristas.length > 0) {
            this.crearLinea(ctx,this.aristas[0].getX(), this.aristas[0].getY(), this.aristas[this.aristas.length - 1].getX(), this.aristas[this.aristas.length - 1].getY())
            this.calcularCentro(ctx);
        }
        this.cerrado = true;
    }

    calcularCentro(ctx) { //calcula el promedio de las posiciones de todos los lados del poligono
        let sumaX = 0;
        let sumaY = 0;

        for (let i = 0; i < this.aristas.length; i++) {
            sumaX += this.aristas[i].getX();
            sumaY += this.aristas[i].getY();
        }

        sumaX = sumaX / this.aristas.length;
        sumaY = sumaY / this.aristas.length;

        let centroF = new Arista(sumaX, sumaY, 7, true, 0, 255, 0);
        centroF.draw(ctx);
        this.centro = centroF;
    }

    crearLinea(ctx, paramPosXI, paramPosYI, paramPosXF, paramPosYF) { //conecta con una linea dos coordenadas
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgb(255,255,0)';
        ctx.beginPath();
        ctx.moveTo(paramPosXI, paramPosYI);
        ctx.lineTo(paramPosXF, paramPosYF);
        ctx.stroke();
    }

    isInside(mouseX, mouseY) { //devuelve la arista que las coordenadas estan dentro
        for (let i = 0; i < this.aristas.length; i++) {
            if (this.aristas[i].isInside(mouseX, mouseY)) {
                return this.aristas[i];
            }
        }
    }

    isCentro(mouseX, mouseY) { //devuelve la figura completa si las coordenadas estan dentro del centro
        if (this.centro != null) {
            if (this.centro.isInside(mouseX, mouseY)) {
                return this;
            }
        }
        return null;
    }

    drawNew(ctx, posX, posY) { //dibujar una nueva arista
        console.log("coordenadas: ");
        console.log(posX);
        console.log(posY);

        if (this.isCentro(posX, posY) == null) {
            let arista = new Arista(posX, posY, 10, false, 255, 0, 0);
            arista.draw(ctx)
            if (this.aristas.length > 0) {
                this.crearLinea(ctx, posX, posY, this.aristas[this.aristas.length - 1].getX(), this.aristas[this.aristas.length - 1].getY())
            }
            this.aristas.push(arista);
        }
    }

    drawAll(ctx) { //dibuja de nuevo a todas las aristas de la figura
        if (this.centro != null) {
            this.calcularCentro(ctx);
        }

        for (let i = 0; i < this.aristas.length; i++) {
            this.aristas[i].draw(ctx);
            if (this.aristas.length > 0 && i > 0) {
                this.crearLinea(ctx, this.aristas[i].getX(), this.aristas[i].getY(), this.aristas[i - 1].getX(), this.aristas[i - 1].getY());
            }
        }

        if (this.cerrado) {
            this.cerrarPoligono(ctx);
        }      
    }

    corrimiento(corrimientoX, corrimientoY) { //agrega un corrimiento a todas las aristas de la figura
        for (let i = 0; i < this.aristas.length; i++) {
            this.aristas[i].setX(this.aristas[i].getX() - corrimientoX);
            this.aristas[i].setY(this.aristas[i].getY() - corrimientoY);
        }
        this.centro.setX(this.centro.getX() - corrimientoX);
        this.centro.setY(this.centro.getY() - corrimientoY);
    }

    delete(aristaParam) { //elimina la arista que viene como parametro
        for (let i = 0; i < this.aristas.length; i++) {
            if (aristaParam === this.aristas[i]) {
                this.aristas.splice(i,1);
            }
        }
    }

    cambiarColor(claroscuro) {
        for (let i = 0; i < this.aristas.length; i++) {
            this.aristas[i].cambiarColor(claroscuro);                
        }
    }
}