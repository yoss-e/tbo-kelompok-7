// Aturan Produksi CFG Dasar
const validRules = ['S-P', 'S-P-O', 'S-P-K', 'S-P-O-K'];

function evaluasiCFG(inputKalimat) {
    let cleanInput = inputKalimat.toUpperCase().trim().replace(/\s+/g, ' ');
    let tags = [];
    let foundK = "";

    // 1. Ekstrak Keterangan
    lexicon['K'].forEach(ket => {
        if (cleanInput.includes(ket)) {
            foundK = ket;
            cleanInput = cleanInput.replace(ket, "").trim();
        }
    });

    // 2. Tokenizing
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
        if (!tagged) tags.push('?');
    });

    if (foundK !== "") tags.push('K');

    // 4. Parsing Evaluasi Pola
    const polaDitemukan = tags.join('-');
    const isValid = validRules.includes(polaDitemukan);

    return {
        valid: isValid,
        pola: polaDitemukan,
        pesan: isValid ? `Struktur Tepat!` : `Struktur tidak valid (${polaDitemukan}). Ingat aturan: S-P, S-P-O, S-P-K, atau S-P-O-K.`
    };
}