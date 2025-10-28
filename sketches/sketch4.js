// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(700, 600);
  };
  
  p.draw = function () {
    p.background(30, 30, 32);

    drawBurner(180, 220, 140, p.hour() % 12, 12);
    drawBurner(520, 220, 80, p.second(), 60);
    drawBurner(350, 380, 110, p.minute(), 60);

    drawKnobs();
  };

  function drawBurner(x, y, size, value, maxValue) {
    let intensity = value / maxValue;

    let burnerColor = p.lerpColor(
      p.color(20, 20, 22),
      p.color(255, 220, 80),
      p.pow(intensity, 0.7)
    );

    if (intensity > 0.3) {
      burnerColor = p.lerpColor(
        p.color(180, 40, 10),
        p.color(255, 220, 80),
        (intensity - 0.3) / 0.7
      );
    }

    if (intensity > 0.1) {
      p.noStroke();
      p.fill(255, 100, 30, intensity * 120);
      p.ellipse(x, y, size + 50, size + 50);

      if (intensity > 0.5) {
        p.fill(255, 200, 100, intensity * 100);
        p.ellipse(x, y, size + 30, size + 30);
      }
    }
    
    p.fill(burnerColor);
    p.noStroke();
    p.ellipse(x, y, size, size);

    p.fill(0, 0, 0, 40);
    p.ellipse(x, y, size * 0.3, size * 0.3);
  }
  
  function drawKnobs() {
    drawKnob(180, 500, p.hour() % 12, 12, 'H');
    drawKnob(350, 500, p.minute(), 60, 'M');
    drawKnob(520, 500, p.second(), 60, 'S');
  }

  function drawKnob(x, y, value, maxValue, label) {
    let angle = p.map(value, 0, maxValue, -135, 135);

    p.fill(60, 60, 65);
    p.noStroke();
    p.ellipse(x, y, 40, 40);

    p.push();
    p.translate(x, y);
    p.rotate(p.radians(angle));
    p.stroke(200, 200, 210);
    p.strokeWeight(2);
    p.line(0, -15, 0, -5);
    p.pop();

    p.fill(120, 120, 125);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER);
    p.text(label, x, y + 30);
  }
});    
    