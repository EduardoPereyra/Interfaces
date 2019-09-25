let context, controller, guy, loop, coin1, coin2;
let ctx = document.querySelector("canvas").getContext("2d");
let ninja = document.getElementById("ninja");
let moneda = document.getElementById("coin");
let moneda2 = document.getElementById("coin2");
let puntos = document.getElementById("puntos");
let tiempo = document.getElementById("tiempo");
let gameoverImg = document.getElementById("gameover");
let heightGround = 90;
let gameOver = false;
let min = 0;
let seg = 0;
let points = 136;
let idTimer = 0;
let idPoints = 0;

ctx.canvas.height = 400;
ctx.canvas.width = 800;
gameoverImg.style.display = 'none';

reiniciarTiempo();
reiniciarPuntos();

guy = {
    height:92,
    width:50,
    jumping:true,
    x:80,
    y:250,
    x_velocity:0,
    y_velocity:0
}; //end guy

coin1 = {
    x: 650,
    y: 250,    
    height: 45,
    width: 35,
    xMove: 5
};

coin2 = {
    x: 325,
    y: 250,   
    height: 45,
    width: 35,
    xMove: 5
};

ninja.style.left = guy.x + "px";
let coinList = [coin1,coin2];

controller = {
    up:false,
    r:false,
    
    keyListener:function(event) {
        let key_state = (event.type == "keydown")?true:false;  
        if(event.keyCode == 38) {//flecha arriba
            controller.up = key_state;
        }
        if(event.keyCode == 32) {//space
            controller.up = key_state;
        }
        if(event.keyCode == 87) {//w
            controller.up = key_state;
        }
        if(event.keyCode == 82) {//r
            controller.r = key_state;
        }
    }
  
}; //end controller
  
loop = function() { //repite esta funcion
    if(!gameOver) {
        if((points == 204) || (points == 340) || (points == 510)){ //aumenta la velocidad
            coin1.xMove += 0.02;
            coin2.xMove += 0.02;
        }
        for (let i = 0; i < coinList.length; i++) { //movimientos de monedas
            coinList[i].x -= coinList[i].xMove;
            if(coinList[i].x < 35){
                coinList[i].x = 650;
            }
        }
            
        if (controller.up && guy.jumping == false) { //que no haya doble salto
            ninja.style.height = 102 + 'px';
            ninja.style.width = 75.2 + 'px';
            ninja.style.background = "url('./images/jump_ninja.png') left center";
            ninja.style.animation = "jump 0.7s steps(10)";
            guy.y_velocity -= 30;
            guy.jumping = true;
        }

        guy.y_velocity += 1.2;// simula la gravedad
        guy.y += guy.y_velocity;
        guy.y_velocity *= 0.9;// friccion para que no suba tan abruptamente

        if (guy.y > ctx.canvas.height - guy.height - heightGround) { //si el la figura se pasa del piso
            guy.jumping = false;
            guy.y = ctx.canvas.height -  guy.height - heightGround;
            guy.y_velocity = 0;
            ninja.style.height = 92 + 'px';
            ninja.style.width = 73.1 + 'px';
            ninja.style.background = "url('./images/run_ninja.png') left center";
            ninja.style.animation = "run 0.7s steps(10) infinite";
        }

        ninja.style.top = guy.y + "px";
        moneda.style.left = coin1.x + "px";
        moneda2.style.left = coin2.x + "px";

        if (guy.x < coin1.x + coin1.width &&
            guy.x + guy.width > coin1.x &&
            guy.y < coin1.y + coin1.height &&
            guy.height + guy.y > coin1.y) { //coin1
                gameOver = true;
                gameoverImg.style.display = 'flex';
        }
        if (guy.x < coin2.x + coin2.width &&
            guy.x + guy.width > coin2.x &&
            guy.y < coin2.y + coin2.height &&
            guy.height + guy.y > coin2.y) { //coin2
                gameOver = true;
                gameoverImg.style.display = 'flex';
        }
    }else{
        ninja.style.height = 96 + 'px';
        ninja.style.width = 92 + 'px';
        ninja.style.background = "url('./images/death_ninja.png') left center";
        ninja.style.animation = "death 2s steps(12)";

        clearInterval(idTimer);
        clearInterval(idPoints);
        if (controller.r) { //reiniciar
            ninja.style.height = 92 + 'px';
            ninja.style.width = 73.1 + 'px';
            ninja.style.background = "url('./images/run_ninja.png') left center";
            ninja.style.animation = "run 0.7s steps(10) infinite";
            gameOver = false;
            gameoverImg.style.display = 'none';
            min = 0;
            seg = 0;
            points = 0;
            coin1.x = 650;
            coin2.x = 325;
            reiniciarTiempo();
            reiniciarPuntos();
        }
    }
    window.requestAnimationFrame(loop);//llama a la actualización cuando el navegador este listo para dibujar nuevamente
};//end loop

function reiniciarTiempo(){
    tiempo.innerHTML = 'Tiempo: 00:00';
    idTimer = window.setInterval(clockMove, 1000);
}

function reiniciarPuntos(){
    puntos.innerHTML = 'Puntos: 0';
    idPoints = window.setInterval(puntosMove, 1500);
}

function clockMove(){
    seg += 1;
    if(seg > 59){
        seg = 0;
        min += 1;
    }
    let segS = seg;
    let minS = min;
    if(seg < 10){
        segS = '0' + seg;
    }
    if(min < 10) {
        minS = '0' + min;
    }
    tiempo.innerHTML = 'Tiempo: ' + minS + ':' + segS;
}

function puntosMove(){
    points += 17;
    if(points > 1000){
        gameOver = true;
        gameoverImg.style.display = 'flex';
    }else{
        puntos.innerHTML = 'Puntos: ' + points;
    }
}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)
window.requestAnimationFrame(loop);