$(document).ready(function () {
  $(".container")
    .mouseenter(function () {
      $(".card").stop().animate(
        {
          top: "-90px",
        },
        "slow"
      );
    })
    .mouseleave(function () {
      $(".card").stop().animate(
        {
          top: 0,
        },
        "slow"
      );
    });
});

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let numHearts = canvas.width;
let hearts = [];
let speed = 1;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

for (let i = 0; i < numHearts; i++) {
  hearts[i] = new Heart();
}

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.z = Math.random() * canvas.height;
  this.color = Math.random() * 360;

  this.move = function () {
    this.z += speed;
    if (this.z >= canvas.height) {
      this.z = 0;
    }
  };

  this.show = function () {
    let x = (this.x - centerX) * (canvas.width / this.z) + centerX;
    let y = (this.y - centerY) * (canvas.width / this.z) + centerY;
    let s = 1.5 * (canvas.width / this.z);
    ctx.beginPath();
    ctx.strokeStyle = `hsl(${this.color}, 100%, 50%)`;
    ctx.arc(x, y, s, 0, Math.PI);
    ctx.lineWidth = 2 * s;
    ctx.lineCap = "round";
    ctx.stroke();
  };
}

function draw() {
  ctx.fillStyle = "#000"; // Fondo del canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numHearts; i++) {
    hearts[i].show();
    hearts[i].move();
  }
  requestAnimationFrame(draw);
}

draw(); // Inicia el dibujo

$(document).ready(function () {
  $(".buttons a").on("click", function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    const targetUrl = $(this).attr("href"); // Obtiene la URL del enlace
    window.location.href = targetUrl; // Redirige a la URL
  });
});
