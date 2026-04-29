const resultTitle = document.getElementById('result-title');
const resultSummary = document.getElementById('result-summary');
const resultScore = document.getElementById('result-score');
const resultCorrect = document.getElementById('result-correct');
const resultAccuracy = document.getElementById('result-accuracy');
const reviewList = document.getElementById('review-list');

const savedResult = JSON.parse(localStorage.getItem('kalimatkuResult') || 'null');

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderEmptyState() {
    resultTitle.innerText = 'Belum Ada Hasil';
    resultSummary.innerText = 'Mulai permainan dari dashboard untuk membuat hasil review baru.';
    reviewList.innerHTML = `
        <article class="empty-review">
            <span class="material-symbols-outlined">sports_esports</span>
            <h3>Belum ada ronde selesai</h3>
            <p>Setelah permainan selesai atau nyawa habis, ringkasan jawaban akan muncul di sini.</p>
            <a class="btn-primary btn-link" href="index.html">MULAI LATIHAN</a>
        </article>
    `;
}

function getFeedback(accuracy) {
    if (accuracy >= 80) return 'Mantap, pola kalimatmu sudah kuat. Pertahankan ketelitian saat ada keterangan panjang.';
    if (accuracy >= 50) return 'Sudah ada dasar yang bagus. Latih lagi urutan Subjek, Predikat, Objek, lalu Keterangan.';
    return 'Perlu pemanasan lagi. Fokus dulu pada pola S-P dan S-P-O sebelum mencoba pola yang lebih panjang.';
}

function renderResult(result) {
    const totalQuestions = result.totalQuestions || result.reviews.length || 0;
    const correctCount = result.reviews.filter(item => item.correct).length;
    const accuracy = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);

    resultTitle.innerText = result.finished ? 'Ronde Selesai' : 'Game Over';
    resultSummary.innerText = getFeedback(accuracy);
    resultScore.innerText = result.score;
    resultCorrect.innerText = `${correctCount}/${totalQuestions}`;
    resultAccuracy.innerText = `${accuracy}%`;

    reviewList.innerHTML = result.reviews.map((item, index) => {
        const statusClass = item.correct ? 'correct' : 'wrong';
        const statusIcon = item.correct ? 'check_circle' : 'cancel';
        const answer = escapeHtml(item.answer || 'Belum dijawab');
        const prompt = escapeHtml(item.prompt);
        const expectedAnswer = escapeHtml(item.expectedAnswer || '-');
        const targetPattern = escapeHtml(item.targetPattern);
        const detectedPattern = escapeHtml(item.detectedPattern || '-');
        const attempts = escapeHtml(item.attempts);

        return `
            <article class="review-card ${statusClass}">
                <div class="review-topline">
                    <span class="review-number">Soal ${index + 1}</span>
                    <span class="review-status">
                        <span class="material-symbols-outlined">${statusIcon}</span>
                        ${item.correct ? 'Benar' : 'Belum tepat'}
                    </span>
                </div>
                <p class="review-prompt">"${prompt}"</p>
                <dl class="review-meta">
                    <div>
                        <dt>Jawaban</dt>
                        <dd>${answer}</dd>
                    </div>
                    <div>
                        <dt>Contoh Efektif</dt>
                        <dd>${expectedAnswer}</dd>
                    </div>
                    <div>
                        <dt>Pola Target</dt>
                        <dd>${targetPattern}</dd>
                    </div>
                    <div>
                        <dt>Pola Terdeteksi</dt>
                        <dd>${detectedPattern}</dd>
                    </div>
                    <div>
                        <dt>Percobaan</dt>
                        <dd>${attempts}</dd>
                    </div>
                </dl>
            </article>
        `;
    }).join('');
}

if (savedResult) {
    renderResult(savedResult);
} else {
    renderEmptyState();
}
