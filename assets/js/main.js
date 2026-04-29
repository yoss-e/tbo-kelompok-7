let currentLevel = 0;
let lives = 3;
let score = 0;
let levelData = [];
let answerReviews = [];
let currentAttempts = 0;
let correctStreak = 0;
let ingameAudioStarted = false;

// Elemen DOM
const teksSoalDisplay = document.getElementById('teks-soal');
const userInput = document.getElementById('answer-input');
const btnCheck = document.getElementById('btn-check');
const livesDisplay = document.getElementById('lives-display');
const scoreDisplay = document.getElementById('score-display');
const progressBar = document.getElementById('progress-bar');
const btnExit = document.getElementById('btn-exit');
const inputSection = document.querySelector('.input-section');
const heartIcon = document.querySelector('.icon-heart');
const fireIcon = document.querySelector('.icon-fire');
const btnAudio = document.getElementById('btn-audio');
const ingameAudio = new Audio('assets/audio/ingame.mp3');

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
            kalimatBenar: kataBenar.join(' ').toLowerCase(),
            target: polaTarget
        });
    }
    return bankSoal;
}

function initGame() {
    localStorage.removeItem('kalimatkuResult');
    currentLevel = 0;
    lives = 3;
    score = 0;
    answerReviews = [];
    currentAttempts = 0;
    correctStreak = 0;
    perbaruiTampilanStreak();
    setupAudioIngame();
    levelData = buatSoalAcak(5);
    muatSoal();
}

function muatSoal() {
    if(currentLevel >= levelData.length) {
        simpanHasilPermainan(true);
        pindahHalaman("result.html");
        return;
    }

    userInput.value = "";
    currentAttempts = 0;
    // Reset styling (Mendukung struktur HTML Tailwind/Custom yang Anda pakai)
    feedbackDrawer.className = "feedback-drawer"; 
    btnCheck.disabled = false;
    btnCheck.onclick = periksaJawaban;

    const data = levelData[currentLevel];
    teksSoalDisplay.innerText = `"${data.kalimatAsal}"`;
    
    if (progressBar) progressBar.style.width = `${(currentLevel / levelData.length) * 100}%`;
    window.setTimeout(() => userInput.focus(), 80);
}

function periksaJawaban() {
    const jawaban = userInput.value.trim();
    if(jawaban === "") return;

    btnCheck.disabled = true; 
    currentAttempts++;
    
    const data = levelData[currentLevel];
    const hasilEvaluasi = evaluasiCFG(jawaban);
    const jawabanTepat = hasilEvaluasi.valid && hasilEvaluasi.pola === data.target;

    feedbackDrawer.classList.add('show');

    if (jawabanTepat) {
        feedbackDrawer.classList.add('theme-correct');
        feedbackDrawer.classList.remove('theme-wrong');
        
        if(feedbackIcon) feedbackIcon.innerText = "check";
        feedbackTitle.innerText = "Luar Biasa!";
        feedbackDesc.innerText = `Pola: ${hasilEvaluasi.pola}`;
        btnNext.innerText = "LANJUT";

        score += 120;
        if (scoreDisplay) scoreDisplay.innerText = score;
        simpanReviewJawaban(true, jawaban, hasilEvaluasi);
        correctStreak++;
        perbaruiTampilanStreak();
        animasiJawabanBenar();

        btnNext.onclick = () => {
            currentLevel++;
            muatSoal();
        };

    } else {
        feedbackDrawer.classList.add('theme-wrong');
        feedbackDrawer.classList.remove('theme-correct');
        
        if(feedbackIcon) feedbackIcon.innerText = "close";
        feedbackTitle.innerText = "Kurang Tepat!";
        feedbackDesc.innerText = hasilEvaluasi.valid
            ? `Pola terdeteksi ${hasilEvaluasi.pola}, tetapi target soal adalah ${data.target}.`
            : hasilEvaluasi.pesan;
        btnNext.innerText = "COBA LAGI";

        correctStreak = 0;
        perbaruiTampilanStreak();
        animasiJawabanSalah();
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
        const jawaban = userInput.value.trim();
        const hasilEvaluasi = evaluasiCFG(jawaban);
        simpanReviewJawaban(false, jawaban, hasilEvaluasi);
        setTimeout(() => {
            simpanHasilPermainan(false);
            pindahHalaman("result.html");
        }, 850);
    }
}

function ulangAnimasi(element, className, removeAfter = 0) {
    if (!element) return;

    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);

    if (removeAfter > 0) {
        window.setTimeout(() => {
            element.classList.remove(className);
        }, removeAfter);
    }
}

function animasiJawabanBenar() {
    buatKonfeti();

    if (fireIcon) {
        ulangAnimasi(fireIcon, 'fire-pop', 560);
    }
}

function animasiJawabanSalah() {
    ulangAnimasi(heartIcon, 'heart-hurt', 660);
    ulangAnimasi(inputSection, 'answer-shake', 460);
}

function perbaruiTampilanStreak() {
    document.body.classList.toggle('hot-streak', correctStreak >= 3);

    if (!fireIcon) return;

    fireIcon.classList.toggle('streak-glow', correctStreak >= 2);
    fireIcon.classList.toggle('streak-purple', correctStreak >= 3);
}

function buatKonfeti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-burst';

    const warnaKonfeti = ['#b7131a', '#ff766b', '#f2b33d', '#16a34a', '#2563eb'];

    for (let i = 0; i < 28; i++) {
        const piece = document.createElement('span');
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 130;
        const rotation = Math.random() * 540;

        piece.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        piece.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
        piece.style.setProperty('--r', `${rotation}deg`);
        piece.style.backgroundColor = warnaKonfeti[i % warnaKonfeti.length];
        piece.style.animationDelay = `${Math.random() * 90}ms`;

        confetti.appendChild(piece);
    }

    document.body.appendChild(confetti);
    window.setTimeout(() => confetti.remove(), 1100);
}

function simpanReviewJawaban(correct, jawaban, hasilEvaluasi) {
    const data = levelData[currentLevel];
    answerReviews[currentLevel] = {
        prompt: data.kalimatAsal,
        expectedAnswer: data.kalimatBenar,
        targetPattern: data.target,
        answer: jawaban,
        detectedPattern: hasilEvaluasi.pola,
        attempts: currentAttempts,
        correct
    };
}

function simpanHasilPermainan(finished) {
    const reviews = levelData.map((item, index) => {
        return answerReviews[index] || {
            prompt: item.kalimatAsal,
            expectedAnswer: item.kalimatBenar,
            targetPattern: item.target,
            answer: "",
            detectedPattern: "",
            attempts: 0,
            correct: false
        };
    });

    localStorage.setItem('kalimatkuResult', JSON.stringify({
        finished,
        score,
        lives,
        totalQuestions: levelData.length,
        reviews,
        completedAt: new Date().toISOString()
    }));
}

if (btnExit) {
    btnExit.addEventListener('click', () => {
        hentikanAudioIngame();
        pindahHalaman("dashboard.html");
    });
}

if (userInput) {
    userInput.addEventListener('keydown', event => {
        if (event.key !== 'Enter' || event.shiftKey) return;

        event.preventDefault();

        if (feedbackDrawer.classList.contains('show')) {
            btnNext.click();
            return;
        }

        if (!btnCheck.disabled) {
            periksaJawaban();
        }
    });
}

function pindahHalaman(url) {
    hentikanAudioIngame();

    if (window.navigateWithTransition) {
        window.navigateWithTransition(url);
        return;
    }

    window.location.href = url;
}

function setupAudioIngame() {
    ingameAudio.loop = true;
    ingameAudio.volume = 0.32;
    ingameAudio.muted = localStorage.getItem('kalimatkuAudioMuted') === 'true';
    perbaruiTombolAudio();

    window.addEventListener('pointerdown', mulaiAudioIngame, { once: true });
    window.addEventListener('keydown', mulaiAudioIngame, { once: true });

    if (btnAudio) {
        btnAudio.addEventListener('click', toggleAudioIngame);
    }

    if (sessionStorage.getItem('kalimatkuStartAudio') === 'true') {
        sessionStorage.removeItem('kalimatkuStartAudio');
        window.setTimeout(mulaiAudioIngame, 120);
    }
}

function mulaiAudioIngame() {
    if (ingameAudio.muted || ingameAudioStarted) return;

    ingameAudio.play()
        .then(() => {
            ingameAudioStarted = true;
            perbaruiTombolAudio();
        })
        .catch(() => {
            ingameAudioStarted = false;
        });
}

function hentikanAudioIngame() {
    ingameAudio.pause();
}

function toggleAudioIngame() {
    ingameAudio.muted = !ingameAudio.muted;
    localStorage.setItem('kalimatkuAudioMuted', ingameAudio.muted);
    perbaruiTombolAudio();

    if (!ingameAudio.muted) {
        mulaiAudioIngame();
    } else {
        ingameAudio.pause();
        ingameAudioStarted = false;
    }
}

function perbaruiTombolAudio() {
    if (!btnAudio) return;

    btnAudio.innerText = ingameAudio.muted ? 'volume_off' : 'volume_up';
    btnAudio.title = ingameAudio.muted ? 'Nyalakan suara' : 'Matikan suara';
    btnAudio.classList.toggle('muted', ingameAudio.muted);
}

window.onload = initGame;
