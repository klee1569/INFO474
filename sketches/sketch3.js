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
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
