let currentScreen = 0;
let noPressed = false;
let hearts = [];
let confetti = [];
let hoverIndex = -1;
let img;

let questions = [
  { text: "But do you realy want to cancel your subscription?", buttons: ["YES", "NO"] },
  { text: "Are you sure you want to do that? :((", buttons: ["YES", "NO"] },
  { text: "Are you sure you want to leave us even though your subscription buys 3 meals each month for hungry children in Ghana?", buttons: ["YES", "NO"] },
  { text: "Are you sure?", buttons: ["YES", "NO"], image: true, subtext: "Are you sure you want to do that to them?" },
  { text: "You don't have a heart but it's okay...", buttons: ["GO TO THE NEXT STEP"] }
];

function preload() {
  img = loadImage('https://t3.ftcdn.net/jpg/03/00/25/68/360_F_300256880_Nx83QV4r3cgKrS4XKy2cDRLNXbe62RnF.jpg');
}

function setup() {
  createCanvas(1920, 1080);
  textFont('Comic Sans MS');
  createHearts();
  createConfetti();
}

function draw() {
  background(255);

  if (noPressed) {
    drawCongratulationsScreen();
  } else {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);

    let question = questions[currentScreen].text;
    let lines = splitTextToLines(question, width * 0.5, 32);
    let totalTextHeight = lines.length * 38; // lineHeight is 32 + 6 for margin

    let yPosition = (height / 2) - (totalTextHeight / 2) - 100;
    for (let line of lines) {
      text(line, width / 2, yPosition);
      yPosition += 38;
    }

    if (questions[currentScreen].image) {
      let buttonDistance = 100; // Distance between buttons
      let imgWidth = width * 0.5;
      let imgHeight = img.height * (imgWidth / img.width); // Maintain aspect ratio
      let imgX = width / 2 - imgWidth / 2;
      let imgY = buttonDistance; // Place image one button distance lower from the top

      image(img, imgX, imgY, imgWidth, imgHeight); // Display the image

      yPosition = imgY + imgHeight + buttonDistance; // Move text closer to the image
      fill(0);
      text(questions[currentScreen].subtext, width / 2, yPosition);
      yPosition += 50;
    }

    yPosition += 30; // Add space between the question and the buttons

    let buttons = questions[currentScreen].buttons;
    hoverIndex = -1; // Reset hoverIndex before checking
    for (let i = 0; i < buttons.length; i++) {
      if (isMouseOverButton(width / 2, yPosition + i * 100, buttons[i])) {
        hoverIndex = i;
      }
      drawButton(buttons[i], width / 2, yPosition + i * 100, hoverIndex === i);
    }
  }
}

function drawButton(label, x, y, isHovered) {
  fill(isHovered ? color(180, 125, 255) : color(135, 55, 255)); // Lighter purple on hover
  noStroke();
  let w = textWidth(label) + 40; // Add padding
  let h = 60;
  rect(x - w / 2, y - h / 2, w, h, 20);
  fill(0);
  text(label, x, y);
}

function isMouseOverButton(x, y, label) {
  let w = textWidth(label) + 40;
  let h = 60;
  return mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2;
}

function mousePressed() {
  if (noPressed) return;

  let buttons = questions[currentScreen].buttons;

  let question = questions[currentScreen].text;
  let lines = splitTextToLines(question, width * 0.5, 32);
  let totalTextHeight = lines.length * 38; // lineHeight is 32 + 6 for margin

  let yPosition = (height / 2) - (totalTextHeight / 2) - 100;
  for (let line of lines) {
    yPosition += 38;
  }

  if (questions[currentScreen].image) {
    let buttonDistance = 100; // Distance between buttons
    let imgWidth = width * 0.5;
    let imgHeight = img.height * (imgWidth / img.width); // Maintain aspect ratio
    let imgX = width / 2 - imgWidth / 2;
    let imgY = buttonDistance; // Place image one button distance lower from the top

    yPosition = imgY + imgHeight + buttonDistance; // Move text closer to the image
    yPosition += 50; // Adjust for the subtext
  }

  yPosition += 30; // Add space between the question and the buttons

  for (let i = 0; i < buttons.length; i++) {
    if (isMouseOverButton(width / 2, yPosition + i * 100, buttons[i])) {
      if (buttons[i] === "YES") {
        currentScreen++;
        if (currentScreen >= questions.length) {
          currentScreen = 0;
        }
      } else if (buttons[i] === "NO") {
        noPressed = true;
      } else if (buttons[i] === "GO TO THE NEXT STEP") {
        window.location.href = "https://kubi-githubiczny.github.io/CreativeCoidng/";
      }
      break; // Exit the loop after handling the button click
    }
  }
}

function splitTextToLines(text, maxWidth, textSize) {
  let words = text.split(' ');
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    let width = textWidth(currentLine + ' ' + word);
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function drawCongratulationsScreen() {
  fill(0);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Congratulations you made the right choice!!!", width / 2, height / 2);

  drawConfetti();
}

function createHearts() {
  for (let i = 0; i < 20; i++) {
    hearts.push({
      x: random(width),
      y: random(-200, -50),
      speed: random(1, 3)
    });
  }
}

function createConfetti() {
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: random(width),
      y: random(height),
      length: random(10, 20),
      angle: random(TWO_PI),
      speed: random(1, 3),
      color: color(random(255), random(255), random(255))
    });
  }
}

function drawConfetti() {
  for (let i = 0; i < confetti.length; i++) {
    let c = confetti[i];
    stroke(c.color);
    strokeWeight(4);
    line(c.x, c.y, c.x + cos(c.angle) * c.length, c.y + sin(c.angle) * c.length);
    c.y += c.speed;
    if (c.y > height) {
      c.y = 0;
      c.x = random(width);
    }
  }
}
