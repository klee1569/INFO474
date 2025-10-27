// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
  };

  p.draw = function () {
    p.background(50, 60, 70);
    p.noStroke();
    p.fill(245);
    p.ellipse(p.width / 2, p.height / 2 + 50, 500, 450);

    p.fill(200, 160, 160);
    p.ellipse(p.width / 2, p.height / 2 - 165 + 50, 365, 130);

    p.fill(220, 180, 180);
    p.ellipse(p.width / 2, p.height / 2 - 195 + 50, 60, 30);

    p.fill(30);
    p.rectMode(p.CENTER);
    p.rect(p.width / 2, p.height / 2 + 50, 220, 70, 20);

    let h = p.hour();
    let m = p.minute();
    let s = p.second();
    let timeStr = p.nf(h, 2) + ':' + p.nf(m, 2) + ':' + p.nf(s, 2);

    p.fill(173, 216, 230);
    p.textSize(38);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(timeStr, p.width / 2, p.height / 2 + 50);

    p.fill(200);
    let btnX = p.width / 2 - 60;
    for (let i = 0; i < 5; i++) {
      p.ellipse(btnX + i * 30, p.height / 2 + 100, 20, 20);
    }

    p.fill(180);
    let legWidth = 30;
    let legHeight = 20;
    p.rect(p.width / 2 - 120, p.height / 2 + 255, legWidth, legHeight, 5);
    p.rect(p.width / 2 + 120, p.height / 2 + 255, legWidth, legHeight, 5);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
