let context, controller, guy, loop;
let ctx = document.querySelector("canvas").getContext("2d");
let ninja = document.getElementById("ninja");
let heightGround = 90;
ctx.canvas.height = 400;
ctx.canvas.width = 800;

guy = {
    height:92,
    width:73.1,
    jumping:true,
    x:80,
    y:250,
    x_velocity:0,
    y_velocity:0
}; //end guy

controller = {
    up:false,
    
    keyListener:function(event) {
        let key_state = (event.type == "keydown")?true:false;  
        if(event.keyCode == 38){//felchita arriba
            controller.up = key_state;
        }
    }
  
}; //end controller
  
loop = function() { //repite esta funcion
        if (controller.up && guy.jumping == false) {   
            guy.y_velocity -= 30;
            guy.jumping = true;
            }
    
            guy.y_velocity += 1.5;// simula la gravedad
            guy.y += guy.y_velocity;
            guy.y_velocity *= 0.9;// friccion para que no suba tan abruptamente
    
            //si el la figura se pasa del piso
            if (guy.y > ctx.canvas.height - guy.height - heightGround) {
                guy.jumping = false;
                guy.y = ctx.canvas.height -  guy.height - heightGround;
                guy.y_velocity = 0;
            }
    
            ninja.style.left = guy.x + "px";
            ninja.style.top = guy.y + "px";
               
            window.requestAnimationFrame(loop);//llama a la actualización cuando el navegador este listo para dibujar nuevamente
};//end loop

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)
window.requestAnimationFrame(loop);