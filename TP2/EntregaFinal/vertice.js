export class Vertice {
    constructor(paramPosX, paramPosY, paramRadio, paramCentro, paramR, paramG , paramB) {
        this.posX = paramPosX;
        this.posY = paramPosY;
        this.radio = paramRadio;
        this.r = paramR;
        this.g = paramG;
        this.b = paramB;
        this.color = 'rgb(' + this.r +','+ this.g +','+ this.b + ')';
        this.centro = paramCentro;
    }

    draw(ctx) { //se dibuja asi mismo en el ctx
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    getY() {
        return this.posY;
    }

    getX() {
        return this.posX;
    }

    setX(paramposX) {
        this.posX = paramposX;
    }

    setY(paramposY) {
        this.posY = paramposY;
    }

    isInside(paramX, paramY) { //devuelve true si el radio de el mouse es menor al radio de la arista
        let radioMouse = Math.sqrt(Math.pow(paramX - this.posX , 2) + Math.pow(paramY - this.posY , 2));
        if (radioMouse <= this.radio) {
            return true;
        }
        return false;
    }


    cambiarColor(claroscuro) { //aumenta los rgb en 10 si claroscuro es true, sino lo disminuye
        if (claroscuro) {//aclarar
            if (this.r < 255) {
                this.r += 10;
            }
            if (this.r == 255) {
                this.g += 10;
                this.b += 10;
            }
        } else { //oscurecer
            if (this.g == 0 || this.b == 0) {
                this.r -= 10;
            }
            if (this.r == 255) {
                this.g -= 10;
                this.b -= 10;
            }
        }
        if (this.r > 255)
            this.r = 255;
        if (this.r < 0)
            this.r = 0;
        if (this.g > 255)
            this.g = 255;
        if (this.g < 0)
            this.g = 0;
        if (this.b > 255)
            this.b = 255;
        if (this.b < 0)
            this.b = 0;
        console.log(this.color);
        this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    }
}