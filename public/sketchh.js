

  
  //-------------------------------------------------
  //-------------------------------------------------
  
  let tokenhash;
  
  var seed, p, rns, DEFAULT_SIZE, WIDTH, HEIGHT, DIM, M;
  var n, oR, iR, strokeScale, strokeScaleN, strokeV, strokeVN;
  var strokeLength, strokeLengthN, spacing, spacingN, phase;
  var phaseN, gap, gapN, t, colp0, colp1, colp2, colp3, colp4;
  var colp5, colp6, colp7, colp8, colp9, colp10, colp11, colp12;
  var colp13, colourpallet, col1, col2, col3, col4;

  tokenhash = "0x12w4tre22222222222234tr32222tr3rt";



  function setup() {
    console.log("--------------f1: ", tokenhash)
    seed = parseInt(tokenhash, 16);
    p = [];
    for (let i = 0; i < 64; i += 2) {
      p.push(tokenhash.substring(i + 2, i + 4));
    }
    
    rns = p.map((x) => {
      return parseInt(x, 16) % 100;
    });
    
    // Dimensionless Canvas setup
    DEFAULT_SIZE = 1500;
    WIDTH = window.innerWidth * 0.25;
    HEIGHT = window.innerWidth * 0.25;
    DIM = Math.min(WIDTH, HEIGHT);
    M = DIM / DEFAULT_SIZE;
    
    // ------ Traits -----
    
    n = 0;
    oR = 900 * M;
    iR = rns[0] < 5 ? 1 * M : rns[0] <= 60 ? 660 * M : 250 * M;
    
    strokeScale = rns[1] < 10 ? 0.2 * M : rns[1] < 98 ? 1 * M : 20 * M;
    strokeScaleN =
      rns[1] < 10 ? "Micro" : rns[1] < 98 ? "Small Stroke" : "Thick";
    
    strokeV = rns[2] < 10 ? 1 : rns[2] <= 80 ? 1.5 : 3;
    strokeVN =
      rns[2] < 10
        ? "Uniform"
        : rns[2] <= 80
        ? "Medium Variation"
        : "Large Variation";
    
    // Length of lines probablilty
    strokeLength = rns[3] < 10 ? 5 : rns[3] <= 60 ? 10 : 20;
    strokeLengthN =
      rns[3] < 10 ? "Short" : rns[3] <= 60 ? "Medium Length" : "Long";
    
    spacing = rns[4] < 25 ? 0.8 : rns[4] <= 90 ? 1 : 3;
    spacingN = rns[4] < 25 ? "Overlap" : rns[4] <= 90 ? "Tight" : "Spaced";
    
    phase =
      rns[6] < 9
        ? 0
        : rns[6] <= 55
        ? 0.01
        : rns[6] <= 60
        ? 0.02
        : rns[6] <= 70
        ? 0.007
        : rns[6] <= 90
        ? 0.1
        : 1;
    phaseN =
      rns[6] < 9
        ? "Straight"
        : rns[6] <= 55
        ? "Gentle"
        : rns[6] <= 60
        ? "Rolling"
        : rns[6] <= 70
        ? "Offset"
        : rns[6] <= 90
        ? "Cross"
        : "Vibration";
    
    gap = rns[5] < 80 ? 0 : rns[5] <= 90 ? 1 : rns[5] <= 98 ? 2 : 4;
    gapN =
      rns[5] < 80
        ? "Air Tight"
        : rns[5] <= 90
        ? "Small Gap"
        : rns[5] <= 98
        ? "Breath"
        : "Spaced out";
    t = 0; // Angle set to 0
    
    colp0 = [147, 27, 79]; //
    colp1 = [65, 190, 200]; //tur
    colp2 = [230, 80, 90]; //
    colp3 = [240, 228, 70];
    colp4 = [26, 230, 170];
    colp5 = [114, 58, 240];
    colp6 = [28, 98, 120];
    colp7 = [242, 220, 196]; // Cream
    colp8 = [10, 102, 141]; // Turq
    colp9 = [30, 30, 32]; //
    colp10 = [10, 40, 90]; // Blue
    colp11 = [217, 35, 68]; // Red
    colp12 = [242, 159, 5]; // D Orange
    colp13 = [75, 40, 90]; // D purple
    
    colourpallet = [
      colp1,
      colp2,
      colp3,
      colp4,
      colp5,
      colp6,
      colp7,
      colp8,
      colp9,
      colp0,
    ];
    
    col1 = colourpallet[rns[8] % 10];
    col2 = colourpallet[rns[9] % 10];
    col3 = colourpallet[rns[10] % 10];
    col4 = colourpallet[rns[10] % 10];
    
 
    
    let nCanvas = createCanvas(WIDTH, HEIGHT);
    nCanvas.parent("nodeContainer1");
  
    background(246, 241, 238);
    stroke(0, 100);
    noFill();
    noLoop();
    randomSeed(0);
    noiseSeed(0);
  
    console.log("------------c23")
    print(tokenhash);
    print(rns);
    print(
      strokeScaleN,
      " | ",
      strokeVN,
      " | ",
      strokeLengthN,
      " | ",
      spacingN,
      " | ",
      phaseN,
      " | ",
      gapN
    );
    console.log("------------traits: ", [strokeScaleN, strokeVN, strokeLengthN, spacingN, phaseN, gapN])
  
    setTimeout(() => {
      console.log("saving canvas");
      // const r = saveCanvas(nCanvas, "myCanvas2", "jpg");
      // console.log("r", r);
      // console.log("ncanvas", nCanvas);
    }, 100);
  }
  
  function draw() {
    translate(width / 2, height / 2);
    noStroke();
    for (let d = iR; d <= oR; d += spacing * strokeScale * 1.9) {
      let end = map(noise(n), 0, 2, 0, PI);
      let cRate = map(d, iR, oR, 0, 1);
      let gRate = map(d, iR, oR, 0.2, 0.95);
      let iRate = map(d, iR, oR, 1, 0.4);
      let arcLength = PI;
      let incr = TWO_PI / 360;
      let gapc = gap * incr;
      for (let theta = -PI / 2; theta <= arcLength + end; theta) {
        let den = map(theta, 0, arcLength + end, 0.2, 1);
        let bGrad = map(theta, arcLength * 0.7, arcLength + end * 0.7, 0, 1);
        // let x = d * sin(theta);
        // let y = d * cos(theta);
        // incr = random(PI / 50, PI / 1000);
        // incr = random()*den*iRate*PI/60;
        // incr = randomGaussian(PI/1000);
        push();
        ran = random(-10, 10);
        let colG =
          random() > gRate
            ? lerpColor(
                color(col1[0] + ran, col1[1] + ran, col1[2] + ran),
                color(col2[0] + ran, col2[1] + ran, col2[2] + ran),
                cRate
              )
            : lerpColor(
                color(col4[0] + ran, col4[1] + ran, col4[2] + ran),
                color(col3[0] + ran, col3[1] + ran, col3[2] + ran),
                cRate
              );
        // let col = theta <= arcLength ? color(0) : lerpColor( color(0), colG ,bGrad);
        let col = lerpColor(color(30), colG, bGrad);
        stroke(col);
        strokeWeight(strokeScale);
        strokeCap[SQUARE];
        let start = theta;
        let stop = start + incr * random(1, strokeLength); // in degrees
        theta = stop + gapc;
        arc(0, 0, d, d, start, stop);
        pop();
  
        // circle(x, -y, random(dotScale, dotScale*dotV));
        // pop();
      }
      n += 1.01;
    }
  }

  
  function keyPressed() {
    if (key === "s") {
      //save out to a file
      saveCanvas(tokenhash, "png");
    }
  }
