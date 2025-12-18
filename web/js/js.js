(function() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  const colors = ["#FF4F5A", "#FFD447", "#4CD964", "#5AC8FA", "#FF9500", "#FF3B30"];

  let pieces = [];
  const numPieces = 70;
  let animationActive = true; // controla se ainda deve cair confete

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Confetti {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = random(0, canvas.width);
      this.y = random(-canvas.height, 0);
      this.size = random(6, 12);
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedY = random(1, 3);
      this.speedX = random(-1, 1);
      this.rotation = random(0, Math.PI * 2);
      this.rotationSpeed = random(-0.05, 0.05);
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;

      // Quando acabar a animação, os confetes que saem não voltam mais
      if (this.y > canvas.height + 20) {
        if (animationActive) {
          this.reset();
          this.y = -20;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  function init() {
    for (let i = 0; i < numPieces; i++) {
      pieces.push(new Confetti());
    }
    requestAnimationFrame(update);
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of pieces) {
      p.update();
      p.draw();
    }

    requestAnimationFrame(update);
  }

  // ✨ Inicia automaticamente quando o site abre
  window.addEventListener("load", init);

  // ⏳ Tempo até parar de cair (mude aqui)
  const STOP_TIME = 8000; // 8 segundos

  setTimeout(() => {
    animationActive = false; // para de gerar novos confetes
  }, STOP_TIME);

})();