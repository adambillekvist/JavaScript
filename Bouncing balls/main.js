// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}


Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};


Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};



Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }     
    }
  }
};

let balls = [];

//MIN kod under
function BallsAmount (quantity) {
  while (balls.length < quantity) {

    // det är 20 % chans att blir en specialball
    let special = random(1,5);
    let fastball = random (1,5);
    let size;
    // vid 2 (specialball) blir bollen mellan 50 till 100 i size
    if (special == 2) {
      size = random(50, 100);
    }
    else {
      size = random(5, 25);
    }

    // Det är 20 % chans att det blir en fastball
   if (fastball == 5) {
      FartX = random(-37, 37);
      FartY = random(-37, 37);
    }
    else  {
      FartX = random(-7, 7);
      FartY = random(-7, 7);
    }

    let ball = new Ball(
      random(0 + size,width - size),
      random(0 + size,height - size),
      FartX,
      FartY,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );

    balls.push(ball);

  }
}

//pushar ut 10 bollar från början
BallsAmount(10)
//efter 5 sekunder addas 20 bollar till
setInterval(function (){ 
  BallsAmount(30)
}, 5000);



function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();