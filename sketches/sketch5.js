// Homework 5
registerSketch('sk5', function (p) {
  let winData, moneyData;
  let mergedData = [];
  let tooltip = null;

  p.setup = function () {
    p.createCanvas(1080, 1080);
    p.textFont('Helvetica');
    p.textAlign(p.CENTER);

    winData = p.loadTable("files/download.csv", "csv", "header", () => {
      moneyData = p.loadTable("files/simplescraper.csv", "csv", "header", () => {
        processData();
      });
    });
  };

  function processData() {
    const fbsRows = [];
    for (let r = 0; r < winData.getRowCount(); r++) {
      if (winData.getString(r, "Classification").toLowerCase() === "fbs") {
        fbsRows.push({
          team: winData.getString(r, "Team"),
          conference: winData.getString(r, "Conference"),
          wins: winData.getNum(r, "Total Wins")
        });
      }
    }

    for (let team of fbsRows) {
      if (team.team.toLowerCase() === "ohio") continue;
      for (let i = 0; i < moneyData.getRowCount(); i++) {
        const school = moneyData.getString(i, "School");
        const revenueStr = moneyData.getString(i, "Total Revenue");
        const revenue = parseFloat(revenueStr.replace(/\$|,| /g, ""));
        if (school && team.team && school.toLowerCase().includes(team.team.toLowerCase())) {
          mergedData.push({
            team: team.team,
            conference: team.conference,
            wins: team.wins,
            revenue: revenue
          });
          break;
        }
      }
    }

    mergedData.sort((a, b) => b.revenue - a.revenue);
  }

  p.draw = function () {
    p.background(250);
    p.textAlign(p.LEFT);
    p.noStroke();
    p.fill(0);

    p.textSize(28);
    p.textStyle(p.BOLD);
    p.text("Money & Wins: The FBS Football Wealth Gap (2024)", 80, 50);

    p.textSize(18);
    p.textStyle(p.BOLD);
    p.text(
      "This scatterplot shows the imbalance between team revenue and success.\n" +
      "Powerhouse programs (like Ohio State, Texas, Penn State) sit high on both axes.\n" +
      "Smaller-budget FBS schools often perform well — due to their conference,\n" + 
      "but wont typically make a bid for the national championship.",
      80, 115
    );

    let maxWins = p.max(mergedData.map(d => d.wins));
    let maxRevenue = p.max(mergedData.map(d => d.revenue));

    const plotMargin = 150;
    const plotLeft = plotMargin;
    const plotRight = p.width - plotMargin;
    const plotTop = 200;
    const plotBottom = p.height - plotMargin;

    p.stroke(0);
    p.strokeWeight(1);
    p.line(plotLeft, plotBottom, plotRight, plotBottom);
    p.line(plotLeft, plotBottom, plotLeft, plotTop);
    p.noStroke();

    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text("Revenue ($)", (plotLeft + plotRight) / 2, plotBottom + 40);

    p.push();
    p.translate(plotLeft - 50, (plotTop + plotBottom) / 2);
    p.rotate(-p.HALF_PI);
    p.text("Wins", 0, 0);
    p.pop();

    let revenueStep = 50000000;
    let maxRevenueRounded = Math.ceil(maxRevenue / revenueStep) * revenueStep;
    p.textSize(12);
    p.textAlign(p.CENTER);

    for (let val = 0; val <= maxRevenueRounded; val += revenueStep) {
      let x = p.map(val, 0, maxRevenueRounded, plotLeft + 20, plotRight - 20);
      p.stroke(0);
      p.line(x, plotBottom - 5, x, plotBottom + 5);
      p.noStroke();
      p.fill(0);
      p.text("$" + p.nfc(val / 1000000, 0) + "M", x, plotBottom + 20);
    }

    let yTicks = maxWins;
    for (let i = 0; i <= yTicks; i++) {
      let y = p.map(i, 0, maxWins, plotBottom - 20, plotTop + 20);
      p.stroke(0);
      p.line(plotLeft - 5, y, plotLeft + 5, y);
      p.noStroke();
      p.fill(0);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(i, plotLeft - 10, y);
    }

    tooltip = null;

    for (let idx = 0; idx < mergedData.length; idx++) {
      let d = mergedData[idx];
      let x = p.map(d.revenue, 0, maxRevenueRounded, plotLeft + 20, plotRight - 20);
      let y = p.map(d.wins, 0, maxWins, plotBottom - 20, plotTop + 20);

      let c = conferenceColor(d.conference);
      p.fill(c[0], c[1], c[2], 180);
      p.noStroke();
      p.circle(x, y, 22);

      if (idx < 5) {
        p.fill(220, 30, 30);
        p.textSize(14);
        p.textStyle(p.BOLD);
        p.text(d.team, x, y - 20);
        p.line(x, y, x, y - 15);
      }

      if (p.dist(p.mouseX, p.mouseY, x, y) < 9) {
        tooltip = {
          x: x,
          y: y,
          team: d.team,
          wins: d.wins,
          revenue: d.revenue
        };
      }

      let n = mergedData.length;
      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
      for (let d of mergedData) {
        let x = d.revenue;
        let y = d.wins;
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
      }
      let m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      let b = (sumY - m * sumX) / n;

      let x1 = 0;
      let y1 = m * x1 + b;
      let x2 = maxRevenueRounded;
      let y2 = m * x2 + b;

      let px1 = p.map(x1, 0, maxRevenueRounded, plotLeft + 20, plotRight - 20);
      let py1 = p.map(y1, 0, maxWins, plotBottom - 20, plotTop + 20);
      let px2 = p.map(x2, 0, maxRevenueRounded, plotLeft + 20, plotRight - 20);
      let py2 = p.map(y2, 0, maxWins, plotBottom - 20, plotTop + 20);

      p.stroke(50, 50, 50);
      p.strokeWeight(2);
      p.line(px1, py1, px2, py2);
    }

    if (tooltip) {
      p.push();

      const padding = 10;
      const lineHeight = 18;
      const boxWidth = 220;
      const boxHeight = 3 * lineHeight + padding;

      p.fill(255);
      p.stroke(0);
      p.strokeWeight(1);
      p.rect(tooltip.x + 15, tooltip.y - boxHeight / 2, boxWidth, boxHeight, 8);

      p.noStroke();
      p.fill(0);
      p.textSize(14);
      p.textAlign(p.LEFT, p.TOP); 

      p.text(`${tooltip.team}`, tooltip.x + 20, tooltip.y - boxHeight / 2 + padding / 2);
      p.text(`Wins: ${tooltip.wins}`, tooltip.x + 20, tooltip.y - boxHeight / 2 + padding / 2 + lineHeight);
      p.text(`Revenue: $${p.nfc(tooltip.revenue, 0)}`, tooltip.x + 20, tooltip.y - boxHeight / 2 + padding / 2 + 2 * lineHeight);

      p.pop();
    }
  };

  function conferenceColor(conf) {
    conf = conf.toLowerCase();
    if (conf.includes("sec")) return [255, 99, 71];
    if (conf.includes("big 10") || conf.includes("big ten")) return [0, 102, 204];
    if (conf.includes("acc")) return [255, 165, 0];
    if (conf.includes("pac") || conf.includes("mountain")) return [60, 179, 113];
    if (conf.includes("big 12")) return [186, 85, 211];
    return [128, 128, 128];
  }
});


