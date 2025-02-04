Algoritmo del Juego
Inicio
Pedir el nombre del jugador.
Generar un código secreto de 4 dígitos únicos.
Iniciar el juego:
Mostrar mensaje explicando el objetivo del juego.
Iniciar contador de intentos en 0.
Bucle de intentos:
Pedir al usuario que ingrese un número de 4 dígitos únicos.
Validar la entrada: Si no es válida, mostrar mensaje de error y repetir.
Comparar con el código secreto:
Si un número está correcto y en la posición correcta → *
Si un número está en el código pero en otra posición → -
Si no hay coincidencias → mensaje de "Ninguna coincidencia"
Si el usuario acierta:
Calcular puntaje según intentos.
Sumarlo al puntaje total.
Preguntar si quiere jugar otra vez.
Si responde "sí", generar nuevo código y repetir.
Si responde "no", mostrar puntaje total y finalizar.



# Juego de Adivinanza de Código

## Descripción

Este es un juego de adivinanza donde el jugador debe adivinar un código de 4 dígitos únicos generado aleatoriamente. El jugador tiene múltiples intentos para adivinar el código y recibe pistas en cada intento. El puntaje se calcula en función del número de intentos requeridos para adivinar el código.

## Reglas

1. Al iniciar el juego, se te pedirá que ingreses tu nombre.
2. El objetivo es adivinar un código de 4 dígitos únicos.
3. En cada intento, recibirás pistas indicando si los dígitos ingresados son correctos y están en la posición correcta (`*`), o si existen en el código pero en otra posición (`-`).
4. Si adivinas el código en 9 intentos o menos, obtendrás 100 puntos. Si adivinas el código en más de 9 intentos, obtendrás 10 puntos.
5. Al final del juego, se te preguntará si deseas jugar de nuevo.
## Código Fuente

````````````````````````````````````javascript
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let nomplayer;
let intentos = 0;
let puntajeTotal = 0;

// Función para generar un código de 4 dígitos únicos
function generarCodigo() {
  let numeros = [];
  while (numeros.length < 4) {
    let digito = Math.floor(Math.random() * 10);
    if (!numeros.includes(digito)) {
      numeros.push(digito);
    }
  }
  return numeros;
}
// Función para validar y evaluar el intento del usuario
function evaluarIntento(intent, codigo) {
  if (!/^\d{4}$/.test(intent) || new Set(intent).size !== 4) {
    console.log("❌ Ingresa exactamente 4 dígitos únicos.");
    return false;
  }
  let intento = intent.split("").map(Number);
  let resultado = "";

  intento.forEach((num, index) => {
    if (num === codigo[index]) {
      resultado += "*"; // Correcto y en la posición correcta
    } else if (codigo.includes(num)) {
      resultado += "-"; // Existe en el código pero en otra posición
    }
  });

  console.log(`🔹 Pista: ${resultado || "Ninguna coincidencia"}`);
  return resultado === "****";
}

// Pregunta si el usuario quiere jugar otra vez o salir
function preguntarReiniciar() {
  rl.question("🔄 ¿Quieres jugar de nuevo? (s/n): ", (respuesta) => {
    if (respuesta.toLowerCase() === "s") {
      jugar(); // Reiniciar el juego
    } else {
      console.log(`👋 ¡Gracias por jugar, ${nomplayer}! Puntaje total: ${puntajeTotal}`);
      rl.close(); // Terminar el juego
    }
  });
}

// Juego principal
function jugar() {
  const codigoSecreto = generarCodigo();
  intentos = 0;
  console.log("🎯 Adivina el código de 4 dígitos únicos.");

  function solicitarIntento() {
    rl.question("👉 Ingresa un número de 4 dígitos: ", (respuesta) => {
      intentos++;
      if (evaluarIntento(respuesta, codigoSecreto)) {
        const puntaje = intentos <= 9 ? 100 : 10;
        puntajeTotal += puntaje;
        console.log(`🏆 ¡Felicidades, ${nomplayer}! Adivinaste el código: ${codigoSecreto.join("")}`);
        console.log(`🎯 Puntaje de esta partida: ${puntaje}`);
        preguntarReiniciar(); // Preguntar si quiere jugar otra vez.
      } else {
        solicitarIntento();
      }
    });
  }

  solicitarIntento();
}

// Solicitar nombre del jugador antes de iniciar el juego
rl.question("📝 Ingresa tu nombre: ", (nombre) => {
  nomplayer = nombre;
  jugar();
});
