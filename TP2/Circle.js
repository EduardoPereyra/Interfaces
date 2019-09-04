export class Circle {
        posX = 0;
        posY = 0;
        radio = 10;
        color = '#000000';

    constructor(paramPosX, paramPosY, paramRadio, paramColor) {
        this.posX = paramPosX;
        this.posY = paramPosY;
        this.radio = paramRadio;
        this.color = paramColor;
    }

    draw(ctx) {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.posX, this.posY , 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    getY() {
        return this.posY;
    }

    getX() {
        return this.posX;
    }
}