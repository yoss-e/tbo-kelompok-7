// Aturan Produksi CFG yang valid untuk Bahasa Indonesia Baku
const validRules = ['S-P', 'S-P-O', 'S-P-K', 'S-P-O-K'];

function evaluasiCFG(inputKalimat) {
    // 1. Preprocessing (Case Folding & Bersihkan spasi berlebih)
    let cleanInput = inputKalimat.toUpperCase().trim().replace(/\s+/g, ' ');
    
    // Penanganan khusus untuk kata keterangan yang memiliki spasi (contoh: "DI KELAS")
    // Dalam implementasi nyata, disarankan menggunakan algoritma POS Tagging yang lebih advanced
    // Untuk prototipe ini, kita identifikasi frasa Keterangan terlebih dahulu.
    let tags = [];
    let isMatch = false;
    let foundK = "";

    lexicon['K'].forEach(ket => {
        if (cleanInput.includes(ket)) {
            foundK = ket;
            cleanInput = cleanInput.replace(ket, "").trim(); // Pisahkan keterangan
        }
    });

    // 2. Tokenizing (Memecah kata yang tersisa)
    const words = cleanInput.split(' ').filter(w => w !== "");

    // 3. Tagging (Menandai S, P, O)
    words.forEach(word => {
        let tagged = false;
        for (let tag in lexicon) {
            if (tag !== 'K' && lexicon[tag].includes(word)) {
                tags.push(tag);
                tagged = true;
                break;
            }
        }
        if (!tagged) tags.push('?'); // Kata tidak dikenal
    });

    // Masukkan kembali tag Keterangan jika ada di akhir
    if (foundK !== "") tags.push('K');

    // 4. Parsing (Mencocokkan dengan Aturan Valid)
    const polaDitemukan = tags.join('-');
    const isValid = validRules.includes(polaDitemukan);

    return {
        valid: isValid,
        pola: polaDitemukan,
        pesan: isValid ? `Struktur Tepat! (${polaDitemukan})` : `Struktur Salah atau kata tidak dikenal (${polaDitemukan}). Harus sesuai CFG: S-P, S-P-O, atau S-P-O-K.`
    };
}