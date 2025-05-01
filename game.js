const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

class Player {
  constructor(x, y, color, controls) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
    this.color = color;
    this.speed = 3;
    this.health = 100;
    this.score = 0;
    this.bullets = [];
    this.controls = controls;
    this.shootCooldown = 0;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // Draw gun barrel
    ctx.fillRect(this.x + this.width, this.y + this.height / 2 - 5, 10, 10);
  }

  move() {
    if (keys[this.controls.up] && this.y > 0) this.y -= this.speed;
    if (keys[this.controls.down] && this.y + this.height < canvas.height) this.y += this.speed;
    if (keys[this.controls.left] && this.x > 0) this.x -= this.speed;
    if (keys[this.controls.right] && this.x + this.width < canvas.width) this.x += this.speed;
  }

  shoot() {
    if (this.shootCooldown > 0) {
      this.shootCooldown--;
      return;
    }
    if (keys[this.controls.shoot]) {
      this.bullets.push(new Bullet(this.x + this.width + 10, this.y + this.height / 2 - 5, 7, 0, this.color));
      this.shootCooldown = 20; // cooldown frames
    }
  }

  updateBullets() {
    this.bullets.forEach((bullet, index) => {
      bullet.update();
      if (bullet.x > canvas.width) {
        this.bullets.splice(index, 1);
      }
    });
  }
}

class Bullet {
  constructor(x, y, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speedX = speedX || 7;
    this.speedY = speedY || 0;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Bot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
    this.color = '#e53e3e';
    this.speed = 1.5;
    this.health = 50;
    this.direction = 1; // 1 right, -1 left
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed * this.direction;
    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.direction *= -1;
    }
  }
}

const player1 = new Player(50, canvas.height / 2 - 25, '#3182ce', {
  up: 'w',
  down: 's',
  left: 'a',
  right: 'd',
  shoot: ' ',
});
const player2 = new Player(100, canvas.height / 2 - 25, '#d53f8c', {
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
  shoot: 'enter',
});

const bots = [];
function spawnBot() {
  const x = Math.random() * (canvas.width - 30);
  const y = Math.random() * (canvas.height - 50);
  bots.push(new Bot(x, y));
}
for (let i = 0; i < 5; i++) {
  spawnBot();
}

function rectsCollide(r1, r2) {
  return (
    r1.x < r2.x + r2.width &&
    r1.x + r1.width > r2.x &&
    r1.y < r2.y + r2.height &&
    r1.y + r1.height > r2.y
  );
}

function bulletHitsBot(bullet, bot) {
  const distX = Math.abs(bullet.x - (bot.x + bot.width / 2));
  const distY = Math.abs(bullet.y - (bot.y + bot.height / 2));
  return distX < bot.width / 2 && distY < bot.height / 2;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player1.move();
  player2.move();

  player1.shoot();
  player2.shoot();

  player1.updateBullets();
  player2.updateBullets();

  bots.forEach((bot, botIndex) => {
    bot.move();
    bot.draw();

    // Check collision with player bullets
    player1.bullets.forEach((bullet, bIndex) => {
      if (bulletHitsBot(bullet, bot)) {
        bot.health -= 25;
        player1.bullets.splice(bIndex, 1);
        if (bot.health <= 0) {
          bots.splice(botIndex, 1);
          player1.score++;
          document.getElementById('p1Score').textContent = player1.score;
          spawnBot();
        }
      }
    });
    player2.bullets.forEach((bullet, bIndex) => {
      if (bulletHitsBot(bullet, bot)) {
        bot.health -= 25;
        player2.bullets.splice(bIndex, 1);
        if (bot.health <= 0) {
          bots.splice(botIndex, 1);
          player2.score++;
          document.getElementById('p2Score').textContent = player2.score;
          spawnBot();
        }
      }
    });
  });

  player1.draw();
  player2.draw();

  document.getElementById('p1Health').textContent = player1.health;
  document.getElementById('p2Health').textContent = player2.health;

  requestAnimationFrame(update);
}

update();
