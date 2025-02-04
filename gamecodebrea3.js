const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let nombreJugador;
let puntajeTotal = 0;

// Función optimizada para generar un código de 4 dígitos únicos
function generarCodigo() {
  const numeros = new Set();
  while (numeros.size < 4) {
    numeros.add(Math.floor(Math.random() * 10));
  }
  return [...numeros];
}

// Función optimizada para evaluar el intento del usuario
function evaluarIntento(intent, codigo) {
  if (!/^\d{4}$/.test(intent) || new Set(intent).size !== 4) {
    console.log("❌ Ingresa exactamente 4 dígitos únicos.");
    return false;
  }

  const intento = intent.split("").map(Number);
  const resultado = intento.reduce((acc, num, index) => {
    return acc + (num === codigo[index] ? "*" : codigo.includes(num) ? "-" : "");
  }, "");

  console.log(`🔹 Pista: ${resultado || "Ninguna coincidencia"}`);
  return resultado === "****";
}

// Pregunta si el usuario quiere jugar otra vez o salir
function preguntarReiniciar() {
  rl.question("🔄 ¿Quieres jugar de nuevo? (s/n): ", (respuesta) => {
    if (respuesta.trim().toLowerCase() === "s") {
      jugar();
    } else {
      console.log(`👋 ¡Gracias por jugar, ${nombreJugador}! Puntaje total: ${puntajeTotal}`);
      rl.close();
    }
  });
}

// Juego principal
function jugar() {
  const codigoSecreto = generarCodigo();
  let intentos = 0;

  console.log("\n🎯 Adivina el código de 4 dígitos únicos.");

  function solicitarIntento() {
    rl.question("👉 Ingresa un número de 4 dígitos: ", (respuesta) => {
      intentos++;
      if (evaluarIntento(respuesta, codigoSecreto)) {
        const puntaje = intentos <= 9 ? 100 : 10;
        puntajeTotal += puntaje;
        console.log(`🏆 ¡Felicidades, ${nombreJugador}! Adivinaste el código: ${codigoSecreto.join("")}`);
        console.log(`🎯 Puntaje de esta partida: ${puntaje}`);
        preguntarReiniciar();
      } else {
        solicitarIntento();
      }
    });
  }

  solicitarIntento();
}

// Solicitar nombre del jugador antes de iniciar el juego
rl.question("📝 Ingresa tu nombre: ", (nombre) => {
  nombreJugador = nombre.trim() || "Jugador"; // Evita nombres vacíos
  jugar();
});
