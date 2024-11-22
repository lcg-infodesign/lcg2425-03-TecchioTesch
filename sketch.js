let data;
let dataObj;

function preload() {
  data = loadTable("assets/data.csv", "csv", "header");
}

// colori
let pageColor = "#EDEDED";
let textColor = "black";
let dotColor = "#11657A";
let minColor = "#18AACE";
let titleColor = (255, 100, 100);

// altre variabili
let circleSize = 130;
let padding = 50;


function setup() {
  let totalWhidth = circleSize * data.getRowCount() + padding * (1 + data.getRowCount());
  createCanvas(totalWhidth, windowHeight);
  background(pageColor);
  dataObj = data.getObject();

  let xPos = padding + circleSize / 2;
  let yPos = windowHeight / 2;

  //ciclo for per disegnare un  glifo per ogni riga
  for (let i = 0; i < data.getRowCount(); i++) {
    //carico i dati della riga
    let item = dataObj[i];

    console.log(item);

    drawGlyph(xPos, yPos, circleSize, item);
    xPos = xPos + padding + circleSize;
  }

  // TITOLO
  noStroke();
  fill(titleColor);
  textSize(30);
  text("Rivers in the world", 150, 50);
  textSize(15);
  text("N° of dots = N° of tributaries", 150, 75);
  text("Red saturation = Max temperature", 150, 95);
  text("Blue stroke = Min temperature", 150, 115);
}

function draw() {}

function drawGlyph(x, y, size, rowData) {


  // CERCHIO AZZURRO
  // disegno un cerchio bianco per la MIN_TEMP intorno al cerchio rosso
  // dimensione --> più il cerchio è grande più la MIN_TEMP è grande 
  // viene costruito per essere sotto e intorno al cerchio rosso 
  // (size -> size +30); mi dice che vairia per quei 30 pixel intorno 
  let popSize = map(rowData.min_temp, -20, 25, size, size +30);
  fill(minColor);
  noStroke();
  ellipse(x, y, popSize, popSize);
  //fillGradient("conic",{from:[x+48, y+48, 0], steps:["red", "orange", "yellow", "orange", "red"]});



  // CERCHIO ROSSO
  let colorSat = map(rowData.max_temp, 5, 30, 50, 255)
  // disegno cerchio rosso con pallini
  noStroke();
  fill("white");
  ellipse(x, y, size, size);
  fill(255, 100, 100, colorSat);
  stroke("#EE6E6A");
  strokeWeight(3);
  ellipse(x, y, size, size);
  // sfondo



  // NOME
  fill(textColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(rowData.name, x, y + size / 2 + 50);
  //scrivo il nome del fiume
  textSize(12);
  text(rowData.length, x, y + size / 2 + 70);
  //scrivo la lunghezza
  text(rowData.outflow, x, y + size / 2 -210);

  // RETTANGOLO PER AFFLUENTE
  fill(255, 100, 100);
  rect(x, y-circleSize-5, 1, 70);



  // PALLINI DENTRO
  for(let j = 0; j< rowData.tributaries; j++) {
    // disegna pallini 
    fill(dotColor);
    noStroke();
    
    // creo angolo casuale e raggio dentro cui devo scegliere un punto casuale 
    let angle = random(TWO_PI);
    let radius = random(size/2 -3); // -3 per evitare che vada troppo vicino al bordo

    push();
    // ora devo usare le trasformazioni 
    // traslo al centro del glifo 
    translate(x, y);
    // ruoto a seconda dell'angolo
    rotate(angle); 
    // mi sposto in funzione del raggio
    translate(radius, 0);
    // disegno il pallino
    ellipse(0, 0, 4, 1)
    // allungo una dimensione per creare un ellisse e non più un cerchio perfetto
    // ripristino origine assi 
    pop();
  }

}
