// Instance-mode sketch for tab 2
registerSketch('sk2', function(p) {

  const MAX_W = 800;
  const MAX_H = 800;
  let w, h;
  
  p.setup = function() {
    w = Math.min(p.windowWidth, MAX_W);
    h = Math.min(p.windowHeight, MAX_H);
    p.createCanvas(w, h);
  };



 p.draw = function () {
    p.background(245, 235, 225);

    const hr24 = p.hour();
    const hr12 = (hr24 % 12) || 12;
    const mn = p.minute();

    const cakeBottom = h * 0.75;
    const layerH = (h / 2.5) / 12;
    const frostingH = 13;
    const baseX = w / 4;
    const cakeWidth = w / 2;

    for (let i = 0; i < hr12; i++) {
      const y = cakeBottom - i * (layerH + frostingH);

      p.fill(245, 220, 180);
      p.rect(baseX, y - layerH, cakeWidth, layerH, 10);
    }
 }
});