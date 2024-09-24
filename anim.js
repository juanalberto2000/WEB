// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Amar puede doler", time: 14 },
  { text: "El amor puede doler a veces", time: 19 },
  { text: "Pero es lo único que sé", time: 23 },
  { text: "Cuando se pone difícil", time: 32 },
  { text: "Sabes, a veces se puede poner difícil", time: 36 },
  { text: "Es lo único que nos hace sentir vivos", time: 41 },
  { text: "Guardamos este amor en una fotografía", time: 51 },
  { text: "Hicimos estos recuerdos para nosotros mismos", time: 56 },
  { text: "Donde nuestros ojos nunca se cierran", time: 59 },
  { text: "Nuestros corazones nunca se rompen", time: 62 },
  { text: "Y el tiempo está congelado para siempre", time: 64 },
  { text: "Así que puedes llevarme", time: 68 },
  { text: "Dentro del bolsillo de tus jeans rasgados", time: 71 },
  { text: "Sostenerme cerca hasta que nuestros ojos se encuentren", time: 76 },
  { text: "Y jamás estarás sola", time: 80 },
  { text: "Espera a que vuelva a casa", time: 84 },
  { text: "El amor puede sanar", time: 90 },
  { text: "Amar puede reparar tu alma", time: 94 },
  { text: "Y es lo único que sé, sé", time: 99 },
  { text: "Te juro que será más fácil", time: 107 },
  { text: "Recuérdalo con cada pedazo de ti", time: 111 },
  { text: "Y es lo único que llevamos con nosotros cuando morimos", time: 117 },
  { text: "Guardamos este amor en una fotografía", time: 129 },
  { text: "Hicimos estos recuerdos para nosotros mismos", time: 132 },
  { text: "Donde nuestros ojos nunca se cierran", time: 134 },
  { text: "Nuestros corazones nunca se rompen", time: 138 },
  { text: "Y el tiempo está congelado para siempre", time: 140 },
  { text: "Así que puedes llevarme", time: 144 },
  { text: "Dentro del bolsillo de tus jeans rasgados", time: 147 },
  { text: "Sostenerme cerca hasta que nuestros ojos se encuentren", time: 151 },
  { text: "Y jamás estarás sola", time: 156 },
  { text: "Y si me haces daño", time: 161 },
  { text: "Está bien, nena", time: 165 },
  { text: "Solo las palabras sangran", time: 167 },
  { text: "Dentro de estas páginas, solo me abrazas", time: 169 },
  { text: "Y nunca te dejaré ir", time: 174 },
  { text: "Espera a que vuelva a casa", time: 178 },
  { text: "Y así podrías encajarme", time: 197 },
  { text: "Dentro del collar que tienes", time: 200 },
  { text: "Desde los dieciséis años", time: 202 },
  { text: "Al lado de tu latido, donde yo debería estar", time: 205 },
  { text: "Mantenlo en el fondo de tu alma", time: 209 },
  { text: "Y si me haces daño", time: 215 },
  { text: "Está bien, nena", time: 218 },
  { text: "Solo las palabras sangran", time: 220 },
  { text: "Dentro de estas páginas, solo me abrazas", time: 222 },
  { text: "Y nunca te dejaré ir", time: 227 },
  { text: "Cuando yo esté lejos", time: 233 },
  { text: "Recordaré cómo me besaste", time: 236 },
  {
    text: "Bajo el poste de luz, en la parte de atrás de la calle 6",
    time: 240,
  },
  {
    text: "Oyéndote susurrar a través del teléfono",
    time: 245,
  },
  { text: "Espera a que vuelva a casa", time: 249 },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);

const images = document.querySelectorAll(".floating-image");
let currentIndex = 0;
const speed = 0.5; // Cambia este valor para ajustar la velocidad
let directions = [];

// Inicializa las direcciones de movimiento
function initializeDirections() {
  images.forEach(() => {
    directions.push({
      x: (Math.random() < 0.5 ? -1 : 1) * speed,
      y: (Math.random() < 0.5 ? -1 : 1) * speed,
    });
  });
}

// Función de animación para mover las imágenes
function animateImages() {
  images.forEach((image, index) => {
    if (image.style.opacity == 1) {
      let rect = image.getBoundingClientRect();
      if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        directions[index].y *= -1; // Rebote vertical
        // Cambiar a movimiento diagonal al rebotar
        if (rect.bottom >= window.innerHeight) {
          directions[index].x = (Math.random() < 0.5 ? -1 : 1) * speed; // Aleatorizar dirección horizontal
          directions[index].y = -speed; // Asegurarse de que se mueva hacia arriba
        }
      }
      if (rect.left <= 0 || rect.right >= window.innerWidth) {
        directions[index].x *= -1; // Rebote horizontal
      }
      image.style.top = `${rect.top + directions[index].y}px`;
      image.style.left = `${rect.left + directions[index].x}px`;
    }
  });
  requestAnimationFrame(animateImages);
}

// Muestra la siguiente imagen
function showNextImage() {
  if (currentIndex < images.length) {
    setTimeout(() => {
      images[currentIndex].style.opacity = 1; // Muestra la imagen
      currentIndex++;
      if (currentIndex < images.length) {
        setTimeout(showNextImage, 300); // Espera 15 segundos antes de mostrar la siguiente
      }
    }, 10000); // Espera 20 segundos para la primera imagen
  }
}

// Inicia las funciones
initializeDirections();
showNextImage();
animateImages(); // Inicia la animación
