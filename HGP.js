const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const music = document.getElementById("music");
const scoreDisplay = document.getElementById("score");
const hitY = canvas.height - 80;
let score = 0;

const songNotes = [
  { time: 500, key: 'A', lane: 0 },
  { time: 750, key: 'S', lane: 1 },
  { time: 1000, key: 'D', lane: 2 },
  { time: 1250, key: 'F', lane: 3 },
  { time: 1500, key: 'A', lane: 0 },
  { time: 1750, key: 'S', lane: 1 },
  { time: 2000, key: 'D', lane: 2 },
  { time: 2250, key: 'F', lane: 3 },
  { time: 2500, key: 'A', lane: 0 },
  { time: 2750, key: 'S', lane: 1 }
];

let activeNotes = [];
let startTime = null;
let running = false;

function startGame() {
  if (running) return;
  music.play();
  startTime = performance.now();
  running = true;
  requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
  if (!running) return;
  const elapsed = timestamp - startTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  ctx.fillRect(0, hitY - 10, canvas.width, 60);

  ctx.fillStyle = "gray";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(100 + i * 100, 0, 80, canvas.height);
  }

  songNotes.forEach(note => {
    if (note.time <= elapsed && !activeNotes.find(n => n.time === note.time)) {
      activeNotes.push({ ...note, y: 0 });
    }
  });

  // mover notas
  activeNotes.forEach(note => {
    note.y += 5;
    ctx.fillStyle = "red";
    ctx.fillRect(100 + note.lane * 100, note.y, 80, 20);
  });

  activeNotes = activeNotes.filter(note => note.y < canvas.height);

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  activeNotes.forEach((note, i) => {
    if (note.key === key && note.y > 500 && note.y < 550) {
      score += 10;
      activeNotes.splice(i, 1);
      scoreDisplay.innerText = "Score: " + score;
    }
  });
});

document.body.addEventListener("click", startGame);