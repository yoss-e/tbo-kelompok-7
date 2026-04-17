let currentLevel = 0;
let lives = 3;
let score = 0;
let levelData = [];

// Elemen DOM
const teksSoalDisplay = document.getElementById('teks-soal');
const userInput = document.getElementById('answer-input');
const btnCheck = document.getElementById('btn-check');
const livesDisplay = document.getElementById('lives-display');
const scoreDisplay = document.getElementById('score-display');
const progressBar = document.getElementById('progress-bar');

const feedbackDrawer = document.getElementById('feedback-drawer');
const feedbackIconContainer = document.getElementById('feedback-icon-bg');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackDesc = document.getElementById('feedback-desc');
const btnNext = document.getElementById('btn-next');

// GENERATOR SOAL ACAK LINTAS TEMA & TRANSITIF/INTRANSITIF
function buatSoalAcak(jumlahSoal) {
    const polaValid = ['S-P', 'S-P-O', 'S-P-K', 'S-P-O-K'];
    let bankSoal = [];

    for(let i = 0; i < jumlahSoal; i++) {
        const polaTarget = polaValid[Math.floor(Math.random() * polaValid.length)];
        const tags = polaTarget.split('-');
        
        // Ambil tema acak dari dictionary.js
        const temaTerpilih = dataKamus[Math.floor(Math.random() * dataKamus.length)];

        // Ambil kata dari tema yang terpilih
        let kataBenar = tags.map(tag => {
            const daftarKata = temaTerpilih[tag];
            return daftarKata[Math.floor(Math.random() * daftarKata.length)];
        });

        // Acak posisinya (menjadi kalimat tidak efektif)
        let kataAcak = [...kataBenar];
        for (let j = kataAcak.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [kataAcak[j], kataAcak[k]] = [kataAcak[k], kataAcak[j]]; 
        }

        // Cegah acakan yang kebetulan berurutan benar
        if (kataAcak.join(' ') === kataBenar.join(' ') && kataAcak.length > 1) {
            [kataAcak[0], kataAcak[1]] = [kataAcak[1], kataAcak[0]];
        }

        bankSoal.push({
            id: i + 1,
            kalimatAsal: kataAcak.join(' ').toLowerCase(),
            target: polaTarget
        });
    }
    return bankSoal;
}

function initGame() {
    levelData = buatSoalAcak(5); 
    muatSoal();
}

function muatSoal() {
    if(currentLevel >= levelData.length) {
        alert(`Selesai! Total XP: ${score}`);
        return;
    }

    userInput.value = "";
    // Reset styling (Mendukung struktur HTML Tailwind/Custom yang Anda pakai)
    feedbackDrawer.className = "feedback-drawer"; 
    btnCheck.disabled = false;
    btnCheck.onclick = periksaJawaban;

    const data = levelData[currentLevel];
    teksSoalDisplay.innerText = `"${data.kalimatAsal}"`;
    
    if (progressBar) progressBar.style.width = `${(currentLevel / levelData.length) * 100}%`;
}

function periksaJawaban() {
    const jawaban = userInput.value.trim();
    if(jawaban === "") return;

    btnCheck.disabled = true; 
    
    const hasilEvaluasi = evaluasiCFG(jawaban); 

    feedbackDrawer.classList.add('show');

    if (hasilEvaluasi.valid) {
        feedbackDrawer.classList.add('theme-correct');
        feedbackDrawer.classList.remove('theme-wrong');
        
        if(feedbackIcon) feedbackIcon.innerText = "check";
        feedbackTitle.innerText = "Luar Biasa!";
        feedbackDesc.innerText = `Pola: ${hasilEvaluasi.pola}`;
        btnNext.innerText = "LANJUT";

        score += 120;
        if (scoreDisplay) scoreDisplay.innerText = score;

        btnNext.onclick = () => {
            currentLevel++;
            muatSoal();
        };

    } else {
        feedbackDrawer.classList.add('theme-wrong');
        feedbackDrawer.classList.remove('theme-correct');
        
        if(feedbackIcon) feedbackIcon.innerText = "close";
        feedbackTitle.innerText = "Kurang Tepat!";
        feedbackDesc.innerText = hasilEvaluasi.pesan;
        btnNext.innerText = "COBA LAGI";

        kurangiNyawa();

        btnNext.onclick = () => {
            feedbackDrawer.classList.remove('show');
            btnCheck.disabled = false;
            userInput.focus();
        };
    }
}

function kurangiNyawa() {
    lives--;
    if (livesDisplay) livesDisplay.innerText = lives;
    if(lives <= 0) {
        setTimeout(() => {
            alert("Game Over! XP yang terkumpul: " + score);
            location.reload();
        }, 500);
    }
}

window.onload = initGame;