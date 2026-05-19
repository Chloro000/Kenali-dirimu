// =========================
// ELEMENT
// =========================

const board = document.getElementById("board");
const rollBtn = document.getElementById("rollBtn");
const diceResult = document.getElementById("diceResult");
const questionModal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");
const submitAnswer = document.getElementById("submitAnswer");
const answerInput = document.getElementById("answerInput");
const scoreDisplay = document.getElementById("score");

const moveSound = document.getElementById("moveSound");
const pointSound = document.getElementById("pointSound");

// =========================
// GAME DATA
// =========================

let currentPosition = 0;
let happinessPoint = 0;
let lastQuestion = "";

const totalTiles = 20;

// =========================
// QUESTIONS
// =========================

const questions = [

  "Apa hal yang paling membuatmu bangga pada dirimu?",
  "Kapan terakhir kali kamu merasa benar-benar didengarkan?",
  "Apa yang biasanya kamu lakukan saat stres?",
  "Hal apa yang ingin kamu perbaiki dari dirimu?",
  "Apa arti bahagia menurutmu?",
  "Siapa orang yang paling membuatmu nyaman?",
  "Apa ketakutan terbesar yang pernah kamu sembunyikan?",
  "Bagaimana cara kamu menenangkan diri saat sedih?",
  "Apa pencapaian kecil yang membuatmu senang?",
  "Apa yang ingin kamu katakan pada dirimu 5 tahun lalu?",
  "Apa hal kecil yang membuat harimu lebih baik?",
  "Kapan terakhir kali kamu merasa sangat percaya diri?",
  "Apa yang paling kamu syukuri hari ini?",
  "Apa yang membuatmu merasa aman?",
  "Bagaimana hubunganmu dengan dirimu sendiri?",
  "Apa emosi yang paling sering kamu rasakan akhir-akhir ini?",
  "Apa yang biasanya membuatmu overthinking?",
  "Apa cara favoritmu untuk healing?",
  "Apa mimpi terbesar yang ingin kamu capai?",
  "Apa kebiasaan buruk yang ingin kamu ubah?",
  "Apa hal yang paling kamu sukai dari kepribadianmu?",
  "Apa yang membuatmu merasa dicintai?",
  "Apa pengalaman yang paling membentuk dirimu?",
  "Apa yang paling sulit kamu ungkapkan?",
  "Apa arti persahabatan bagimu?",
  "Apa cara terbaik menurutmu untuk menghadapi kegagalan?",
  "Apa hal yang sering kamu sembunyikan dari orang lain?",
  "Bagaimana kamu menunjukkan kasih sayang?",
  "Apa yang membuatmu merasa berharga?",
  "Apa hal yang paling ingin kamu pelajari tentang dirimu?",
  "Apa yang membuatmu takut akan masa depan?",
  "Siapa sosok yang paling menginspirasimu?",
  "Apa definisi sukses menurutmu?",
  "Apa yang membuatmu merasa tenang?",
  "Apa cara favoritmu menghabiskan waktu sendiri?",
  "Apa hal yang membuatmu sulit percaya diri?",
  "Apa bentuk self-care favoritmu?",
  "Apa momen paling bahagia yang kamu ingat?",
  "Apa yang biasanya kamu lakukan saat kecewa?",
  "Apa yang ingin kamu ubah dari cara berpikirmu?"

];

// =========================
// CREATE TILES
// =========================

const positions = [
  [10,10],
  [150,10],
  [290,10],
  [430,10],
  [570,10],
  [710,10],

  [710,150],
  [710,290],
  [710,430],
  [710,570],

  [710,710],
  [570,710],
  [430,710],
  [290,710],
  [150,710],
  [10,710],

  [10,570],
  [10,430],
  [10,290],
  [10,150],
];

for(let i=0; i<totalTiles; i++){

  const tile = document.createElement("div");
  tile.classList.add("tile");

  tile.innerHTML = `
    <span>Kotak ${i + 1}</span>
  `;

  tile.style.left = positions[i][0] + "px";
  tile.style.top = positions[i][1] + "px";

  board.appendChild(tile);
}

// =========================
// PLAYER
// =========================

const player = document.createElement("div");
player.classList.add("player");

board.appendChild(player);

updatePlayerPosition();

// =========================
// UPDATE PLAYER POSITION
// =========================

function updatePlayerPosition(){

  player.style.left = positions[currentPosition][0] + 45 + "px";
  player.style.top = positions[currentPosition][1] + 45 + "px";
}

// =========================
// ROLL DICE
// =========================

rollBtn.addEventListener("click", async ()=>{

  rollBtn.disabled = true;

  // animasi dadu
  let animationCount = 10;

  const interval = setInterval(()=>{

    const randomFace = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = randomFace;

  },100);

  setTimeout(async ()=>{

    clearInterval(interval);

    const dice = Math.floor(Math.random() * 6) + 1;

    diceResult.textContent = dice;

    await movePlayer(dice);

    showQuestion();

    rollBtn.disabled = false;

  },1000);

});

// =========================
// MOVE PLAYER
// =========================

async function movePlayer(steps){

  for(let i=0; i<steps; i++){

    currentPosition++;

    if(currentPosition >= totalTiles){
      currentPosition = 0;
    }

    updatePlayerPosition();

    moveSound.currentTime = 0;
    moveSound.play();

    await delay(400);
  }
}

// =========================
// DELAY
// =========================

function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =========================
// SHOW QUESTION
// =========================

function showQuestion(){

  let randomQuestion;

  do{
    randomQuestion =
      questions[
        Math.floor(Math.random() * questions.length)
      ];

  } while(randomQuestion === lastQuestion);

  lastQuestion = randomQuestion;

  questionText.textContent = randomQuestion;

  answerInput.value = "";

  questionModal.classList.remove("hidden");
}

// =========================
// SUBMIT ANSWER
// =========================

submitAnswer.addEventListener("click", ()=>{

  if(answerInput.value.trim() === ""){

    alert("Yuk isi jawaban refleksimu dulu 😊");
    return;
  }

  happinessPoint += 10;

  scoreDisplay.textContent = happinessPoint;

  pointSound.currentTime = 0;
  pointSound.play();

  createConfetti();

  animateScore();

  questionModal.classList.add("hidden");
});

// =========================
// SCORE ANIMATION
// =========================

function animateScore(){

  scoreDisplay.style.transform = "scale(1.3)";
  scoreDisplay.style.transition = "0.3s";

  setTimeout(()=>{
    scoreDisplay.style.transform = "scale(1)";
  },300);
}

// =========================
// CONFETTI EFFECT
// =========================

function createConfetti(){

  const container = document.getElementById("confetti-container");

  for(let i=0; i<40; i++){

    const confetti = document.createElement("div");

    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * window.innerWidth + "px";

    confetti.style.background =
      `hsl(${Math.random()*360},100%,70%)`;

    confetti.style.animationDuration =
      (Math.random() * 3 + 2) + "s";

    confetti.style.width =
      (Math.random() * 8 + 5) + "px";

    confetti.style.height =
      (Math.random() * 8 + 5) + "px";

    container.appendChild(confetti);

    setTimeout(()=>{
      confetti.remove();
    },5000);
  }
}
