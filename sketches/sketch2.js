// Instance-mode sketch for tab 2
registerSketch('sk2', function(p) {

  const MAX_W = 800;
  const MAX_H = 800;
  let w, h;
  let storedSprinkles = [];
  
  p.setup = function() {
    w = Math.min(p.windowWidth, MAX_W);
    h = Math.min(p.windowHeight, MAX_H);
    p.createCanvas(w, h);
    p.textAlign(p.CENTER, p.CENTER);
    p.textStyle(p.BOLD);
    p.noStroke();
    p.generateSprinkles();
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

      const fy = y - layerH - frostingH;
      let frostingWidth;
      if (i < hr12 - 1) {
        frostingWidth = cakeWidth;
      } else {
        frostingWidth = cakeWidth * (mn / 60);
      }

      p.fill(255, 180, 200);
      p.rect(baseX, fy, frostingWidth, frostingH, 10);

      let sprinkleLayer = storedSprinkles[i] || [];
      for (let s of sprinkleLayer) {
        if (s.x < baseX + frostingWidth) {
          p.fill(s.col);
          p.ellipse(s.x, s.y, 6, 6);
        }
      }
    }

    p.fill(10);
    p.textSize(90); 
    const hh = p.nf(hr12, 2);
    const mm = p.nf(mn, 2);
    p.text(`${hh}:${mm}`, w / 2, h / 2);
 };

 p.generateSprinkles = function () {
    storedSprinkles = [];
    const baseX = w / 4;
    const cakeWidth = w / 2;
    const cakeBottom = h * 0.75;
    const layerH = (h / 2.5) / 12;
    const frostingH = 12;

    for (let i = 0; i < 12; i++) {
      const fy = cakeBottom - i * (layerH + frostingH) - layerH - frostingH;
      const sprinkles = [];
      const num = p.int(p.random(10, 25));
      for (let j = 0; j < num; j++) {
        const sx = baseX + p.random(cakeWidth);
        const sy = fy + p.random(2, frostingH - 2);
        sprinkles.push({ x: sx, y: sy, col: p.color(p.random(255), p.random(255), p.random(255)) });
      }
      storedSprinkles.push(sprinkles);
    }
  };
});