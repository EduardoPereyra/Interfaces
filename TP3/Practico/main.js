/*Ejercicio 2*/
let rect1 = document.getElementById("ejercicio2");
rect1.onclick = function () { transformRandom()};

function transformRandom() {
    let random = Math.round(Math.random() * 3);
    switch (random) {
      case 0:
          let scaleX = Math.round(Math.random() * 3);
          let scaleY = Math.round(Math.random() * 3);
          if(scaleX < 0.2)
          scaleX = 0.2;
          if(scaleY < 0.2)
          scaleX = 0.2;
          rect1.style.transform = 'scale(' + scaleX +',' + scaleY  + ')';
        break;
      case 1:
          let xdeg = Math.round(Math.random() * 25);
          let ydeg = Math.round(Math.random() * 25);
          rect1.style.transform = 'skew(' + xdeg  + 'deg,'+ ydeg  + 'deg)';
        break;
      default:
          let spin = Math.round(Math.random() * 360);
          rect1.style.transform = 'rotate(' + spin + 'deg)';
        break;
    }
}
/*Fin de Ejercicio 2*/

/*Ejercicio 3*/
let hourHand = document.getElementById('hora_aguja');
let minHand = document.getElementById('min_aguja');
let segHand = document.getElementById('seg_aguja');

clockStart();

function clockStart(){
  let date = new Date();
  let hour = ((date.getHours() + 11) % 12 + 1);
  let minute = date.getMinutes();
  let second = date.getSeconds();
  window.setInterval(clockStart, 1000);

  let hourDeg = hour * 30 + (0.5 * minute); //360 / 12 = 30 ---- 30 / 60 = 0.5 
  let minuteDeg = minute * 6 + (0.1 * second); //360 / 60 = 6 ---- 6 / 60 = 0.1
  let secondDeg = second * 6; //360 / 60 = 6 

  hourHand.style.transform = 'rotate('+ hourDeg + 'deg)';
  minHand.style.transform = 'rotate('+ minuteDeg + 'deg)';
  segHand.style.transform = 'rotate('+ secondDeg + 'deg)';
}
/*Fin ejercicio 3*/

/*Ejercicio 5*/
let map = document.getElementById('map');
let guy = document.getElementById('ninja');
map.onmousemove = function () { move(event); }


function move(event){
  let x = event.layerX;
  let y = event.layerY;
  guy.style.left = x + "px";
  guy.style.top = y + "px";
}
/*Fin ejercicio 5*/