import { Vertice } from "./vertice.js";

export class Figura {
    constructor() {
        this.vertices = [];
        this.centro;
        this.cerrado = false;
    }

    cargarCoordenadas(event,ctx) { //carga las cordenadas donde esta el mouse
        let mouseX = event.layerX;
        let mouseY = event.layerY;
        this.drawNew(ctx, mouseX, mouseY);
    }

    cerrarPoligono(ctx) { //cierra el poligono, une la ultima vertice con la primera
        if (this.vertices.length > 0) {
            this.crearLinea(ctx,this.vertices[0].getX(), this.vertices[0].getY(), this.vertices[this.vertices.length - 1].getX(), this.vertices[this.vertices.length - 1].getY())
            this.calcularCentro(ctx);
        }
        this.cerrado = true;
    }

    calcularCentro(ctx) { //calcula el promedio de las posiciones de todos los lados del poligono
        let sumaX = 0;
        let sumaY = 0;

        for (let i = 0; i < this.vertices.length; i++) {
            sumaX += this.vertices[i].getX();
            sumaY += this.vertices[i].getY();
        }

        sumaX = sumaX / this.vertices.length;
        sumaY = sumaY / this.vertices.length;

        let centroF = new Vertice(sumaX, sumaY, 7, true, 0, 255, 0);
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

    isInside(mouseX, mouseY) { //devuelve la vertice que las coordenadas estan dentro
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].isInside(mouseX, mouseY)) {
                return this.vertices[i];
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

    drawNew(ctx, posX, posY) { //dibujar una nueva vertice
        console.log("coordenadas: ");
        console.log(posX);
        console.log(posY);

        if (this.isCentro(posX, posY) == null) {
            let vertice = new Vertice(posX, posY, 10, false, 255, 0, 0);
            vertice.draw(ctx)
            if (this.vertices.length > 0) {
                this.crearLinea(ctx, posX, posY, this.vertices[this.vertices.length - 1].getX(), this.vertices[this.vertices.length - 1].getY())
            }
            this.vertices.push(vertice);
        }
    }

    drawAll(ctx) { //dibuja de nuevo a todas las vertices de la figura
        if (this.centro != null) {
            this.calcularCentro(ctx);
        }

        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].draw(ctx);
            if (this.vertices.length > 0 && i > 0) {
                this.crearLinea(ctx, this.vertices[i].getX(), this.vertices[i].getY(), this.vertices[i - 1].getX(), this.vertices[i - 1].getY());
            }
        }

        if (this.cerrado) {
            this.cerrarPoligono(ctx);
        }      
    }

    corrimiento(corrimientoX, corrimientoY) { //agrega un corrimiento a todas las vertices de la figura
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].setX(this.vertices[i].getX() - corrimientoX);
            this.vertices[i].setY(this.vertices[i].getY() - corrimientoY);
        }
        this.centro.setX(this.centro.getX() - corrimientoX);
        this.centro.setY(this.centro.getY() - corrimientoY);
    }

    delete(verticeParam) { //elimina la vertice que viene como parametro
        for (let i = 0; i < this.vertices.length; i++) {
            if (verticeParam === this.vertices[i]) {
                this.vertices.splice(i,1);
            }
        }
    }

    cambiarColor(claroscuro) {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].cambiarColor(claroscuro);                
        }
    }
}