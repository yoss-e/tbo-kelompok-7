const dataKamus = [
    {
        tema: "Literasi",
        S: ["BUDI", "SAYA", "AYAH", "ADIK", "SISWA"],
        P: ["MEMBACA", "MENULIS", "MEMPELAJARI", "MENGGAMBAR"],
        O: ["BUKU", "MAJALAH", "KORAN", "CERITA"],
        K: ["DI KAMAR", "DI PERPUSTAKAAN", "KEMARIN", "DENGAN SERIUS"]
    },
    {
        tema: "Dapur",
        S: ["IBU", "KAKAK", "KAMI", "MEREKA"],
        P: ["MEMASAK", "MAKAN", "MINUM", "MENYIAPKAN"],
        O: ["NASI", "IKAN", "AYAM", "SAYUR"],
        K: ["DI DAPUR", "PAGI INI", "DENGAN CEPAT", "UNTUK KELUARGA"]
    },
    {
        tema: "Hewan Liar",
        S: ["KUCING", "ANJING", "HARIMAU", "ELANG"],
        P: ["MENGEJAR", "MENGGIGIT", "MELIHAT", "MENANGKAP"],
        O: ["TIKUS", "BURUNG", "MANGSA", "IKAN"],
        K: ["DI TAMAN", "DI HUTAN", "DENGAN GANAS", "HARI INI"]
    },
    {
        tema: "Olahraga",
        S: ["ATLET", "BUDI", "MEREKA", "KAMI"],
        P: ["MENENDANG", "MELEMPAR", "MEMBAWA", "MENANGKAP"],
        O: ["BOLA", "SEPATU", "JERSEY", "PIALA"],
        K: ["DI LAPANGAN", "SORE HARI", "DENGAN KUAT", "DI STADION"]
    }
];

const lexicon = { 'S': [], 'P': [], 'O': [], 'K': [] };

dataKamus.forEach(tema => {
    lexicon.S.push(...tema.S);
    lexicon.P.push(...tema.P);
    lexicon.O.push(...tema.O);
    lexicon.K.push(...tema.K);
});