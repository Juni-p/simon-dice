const colores = ["blue", "red", "yellow", "green"];
let combinacionDeColoresMaquina = [];
let combinacionDeColoresJugador = [];
const botones = document.querySelectorAll(".btn");
const jugar = document.querySelector(".btn-jugar");

let ronda = 0;

function numeroRandom() {
  let random = Math.floor(Math.random() * colores.length);
  return random;
}
function generarColorRandom() {
  return colores[numeroRandom()];
}

function secuenciaJugador(color) {
  combinacionDeColoresMaquina.push(color);
}

function clickearBotones() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (btn) => {
      let color = btn.target.id;
      console.log(color);
      remarcarColor(color);
    });
  });
}

function SecuenciaDeColoresMaquina() {
  ronda++;
  let color = generarColorRandom();
  combinacionDeColoresMaquina.push(color);
  remarcarColor(color);
}

clickearBotones();

function jugadaMaquina() {
  for (let i = 0; i < 10; i++) {
    let contador = (i + 1) * 1000;
    setTimeout(() => {
      SecuenciaDeColoresMaquina();
    }, contador);
  }
}

function remarcarColor(id) {
  let element = document.querySelector(`#${id}`);
  element.classList.add("flash");
  setTimeout(() => {
    element.classList.remove("flash");
  }, 250);
}

jugar.addEventListener("click", () => {
  jugadaMaquina();
});
