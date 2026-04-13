// Variabel Status Game
let currentLevel = 0;
let lives = 3;
let score = 0;
let levelData = [];

// Elemen DOM
const soalContainer = document.getElementById('soal-container');
const userInput = document.getElementById('user-input');
const btnCheck = document.getElementById('btn-check');
const feedbackPanel = document.getElementById('feedback-panel');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackDesc = document.getElementById('feedback-desc');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const progressFill = document.getElementById('progress');

// Karena browser membatasi fetch() untuk file lokal (CORS), kita bypass untuk prototipe dengan variabel biasa
// Jika di-hosting (XAMPP/Vercel/GitHub Pages), Anda bisa gunakan fetch('data/levels.json')
const dummyLevels = [
    { id: 1, scrambled: ["MEMBACA", "SAYA", "BUKU"], target: "S-P-O" },
    { id: 2, scrambled: ["IBU", "DI DAPUR", "MEMASAK", "NASI"], target: "S-P-O-K" },
    { id: 3, scrambled: ["BELAJAR", "BUDI"], target: "S-P" }
];

function initGame() {
    levelData = dummyLevels;
    muatSoal();
}

function muatSoal() {
    if(currentLevel >= levelData.length) {
        alert(`Selamat! Kamu menyelesaikan game dengan skor ${score}`);
        return;
    }

    // Reset UI
    userInput.value = "";
    feedbackPanel.classList.remove('show', 'feedback-correct', 'feedback-wrong');
    btnCheck.className = "btn primary";
    btnCheck.innerText = "PERIKSA";
    btnCheck.onclick = periksaJawaban;

    // Tampilkan kata acak
    const data = levelData[currentLevel];
    soalContainer.innerHTML = "";
    data.scrambled.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word-badge';
        span.innerText = word;
        soalContainer.appendChild(span);
    });

    // Update Progress
    const progressPercent = (currentLevel / levelData.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
}

function periksaJawaban() {
    const jawaban = userInput.value;
    if(jawaban.trim() === "") return;

    // Memanggil fungsi dari engine.js
    const hasilEvaluasi = evaluasiCFG(jawaban);

    feedbackPanel.classList.add('show');
    
    if (hasilEvaluasi.valid) {
        // BENAR
        feedbackPanel.classList.add('feedback-correct');
        feedbackTitle.innerText = "Luar Biasa!";
        feedbackDesc.innerText = hasilEvaluasi.pesan;
        
        btnCheck.className = "btn correct";
        btnCheck.innerText = "LANJUTKAN";
        score += 100;
        scoreDisplay.innerText = `⭐ ${score}`;
        
        btnCheck.onclick = () => {
            currentLevel++;
            muatSoal();
        };
    } else {
        // SALAH
        feedbackPanel.classList.add('feedback-wrong');
        feedbackTitle.innerText = "Aduh, Kurang Tepat!";
        feedbackDesc.innerText = hasilEvaluasi.pesan;
        
        btnCheck.className = "btn wrong";
        btnCheck.innerText = "COBA LAGI";
        
        kurangiNyawa();
        
        btnCheck.onclick = () => {
            feedbackPanel.classList.remove('show', 'feedback-wrong');
            btnCheck.className = "btn primary";
            btnCheck.innerText = "PERIKSA";
            btnCheck.onclick = periksaJawaban;
        };
    }
}

function kurangiNyawa() {
    lives--;
    let hearts = "";
    for(let i=0; i<lives; i++) hearts += "❤️";
    for(let i=lives; i<3; i++) hearts += "🤍"; // Nyawa hilang
    livesDisplay.innerText = hearts;

    if(lives <= 0) {
        setTimeout(() => {
            alert("Game Over! Nyawa kamu habis.");
            location.reload(); // Restart game
        }, 500);
    }
}

// Mulai Game
window.onload = initGame;