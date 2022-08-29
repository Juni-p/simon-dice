let jugadasMaquina = [];
let jugadasJugador = [];

const $botones = document.querySelectorAll(".btn");

document.querySelector("#jugar").onclick = manejarTurnoMaquina;

function manejarTurnoMaquina() {
  bloquearUsuario();

  $botonSecuenciaMaquina = obtenerBotonAleatorio();
  jugadasMaquina.push($botonSecuenciaMaquina);

  const delayJugador = (jugadasMaquina.length + 1) * 1000;

  jugadasMaquina.forEach(function ($boton, i) {
    const delayMaquina = (i + 1) * 1200;
    setTimeout(function () {
      resaltar($boton);
    }, delayMaquina);
  });

  setTimeout(function () {
    desbloquearUsuario();
    manejarTurnoJugador();
  }, delayJugador);

  jugadasJugador = [];
}

function pruebaUsuario(event) {
  const $boton = event.target;
  resaltar($boton);
  jugadasJugador.push($boton);

  const $botonMaquina = jugadasMaquina[jugadasJugador.length - 1];

  if ($boton.id !== $botonMaquina.id) {
    alert("perdiste");
    return;
  }

  if (jugadasJugador.length === jugadasMaquina.length) {
    bloquearUsuario();
    setTimeout(manejarTurnoMaquina, 1000);
  }
}

function resaltar(btn) {
  btn.classList.add("resaltar");
  setTimeout(function () {
    btn.classList.remove("resaltar");
  }, 500);
}

function obtenerBotonAleatorio() {
  indiceAleatorio = Math.floor(Math.random() * $botones.length);
  return $botones[indiceAleatorio];
}

function bloquearUsuario() {
  document.querySelector("main").classList.add("bloquear");
}

function desbloquearUsuario() {
  document.querySelector("main").classList.remove("bloquear");
}

function manejarTurnoJugador() {
  $botones.forEach(function ($boton) {
    $boton.onclick = pruebaUsuario;
  });
}
