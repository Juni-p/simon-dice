let jugadasMaquina = [];
let jugadasUsuario = [];

const $jugar = document.querySelector("#jugar");
const $contenedorBotones = document.querySelector("main");
const $botones = document.querySelectorAll(".btn");

agregarCursor($jugar);
$jugar.onclick = manejarTurnoMaquina;

function manejarTurnoMaquina() {
  bloquearUsuario($contenedorBotones);
  bloquearUsuario($jugar);

  $botonSecuenciaMaquina = obtenerBotonAleatorio();
  jugadasMaquina.push($botonSecuenciaMaquina);

  const MILISEGUNDOS_DE_ESPERA_JUGADOR = (jugadasMaquina.length + 1) * 1000;

  jugadasMaquina.forEach(function ($boton, i) {
    const MILISEGUNDOS_DE_ESPERA_MAQUINA = (i + 1) * 1200;
    setTimeout(function () {
      resaltar($boton);
    }, MILISEGUNDOS_DE_ESPERA_MAQUINA);
  });

  setTimeout(function () {
    desbloquearUsuario($contenedorBotones);
    manejarTurnoJugador();
  }, MILISEGUNDOS_DE_ESPERA_JUGADOR);

  jugadasUsuario = [];
}

function compararJugadas(event) {
  const $boton = event.target;
  resaltar($boton);
  jugadasUsuario.push($boton);

  const $botonMaquina = jugadasMaquina[jugadasUsuario.length - 1];

  if ($boton.id !== $botonMaquina.id) {
    alert("Perdiste, para volver a jugar presione el boton jugar.");
    reiniciar();
    return;
  }

  if (jugadasUsuario.length === jugadasMaquina.length) {
    const MILISEGUNDOS_DE_ESPERA_COMPARACION = 1000;
    bloquearUsuario($contenedorBotones);
    setTimeout(manejarTurnoMaquina, MILISEGUNDOS_DE_ESPERA_COMPARACION);
  }
}

function reiniciar() {
  jugadasUsuario = [];
  jugadasMaquina = [];
  bloquearUsuario($contenedorBotones);
  desbloquearUsuario($jugar);
}

function resaltar($boton) {
  $boton.classList.add("resaltar");
  const MILISEGUNDOS_DE_ESPERA_BOTON_RESALTADO = 500;
  setTimeout(function () {
    $boton.classList.remove("resaltar");
  }, MILISEGUNDOS_DE_ESPERA_BOTON_RESALTADO);
}

function obtenerBotonAleatorio() {
  indiceAleatorio = Math.floor(Math.random() * $botones.length);
  return $botones[indiceAleatorio];
}

function bloquearUsuario($elemento) {
  $elemento.classList.add("bloquear");
}

function desbloquearUsuario($elemento) {
  $elemento.classList.remove("bloquear");
}

function manejarTurnoJugador() {
  $botones.forEach(function ($boton) {
    agregarCursor($boton);
    $boton.onclick = compararJugadas;
  });
}

function agregarCursor($elemento) {
  $elemento.classList.add("cursor");
}

function eliminarCursor($elemento) {
  $elemento.classList.remove("cursor");
}
