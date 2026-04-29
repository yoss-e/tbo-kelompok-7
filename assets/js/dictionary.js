const dataKamus = [
    {
        tema: "Literasi",
        S: ["BUDI", "SAYA", "AYAH", "ADIK", "SISWA", "GURU", "PENULIS", "PUSTAKAWAN"],
        P: ["MEMBACA", "MENULIS", "MEMPELAJARI", "MENGGAMBAR", "MENCATAT", "MENGULAS", "MERINGKAS"],
        O: ["BUKU", "MAJALAH", "KORAN", "CERITA", "PUISI", "NOVEL", "ARTIKEL", "CATATAN"],
        K: ["DI KAMAR", "DI PERPUSTAKAAN", "KEMARIN", "DENGAN SERIUS", "SETELAH SEKOLAH", "PADA MALAM HARI", "UNTUK TUGAS"]
    },
    {
        tema: "Dapur",
        S: ["IBU", "KAKAK", "KAMI", "MEREKA", "KOKI", "NENEK", "PAMAN"],
        P: ["MEMASAK", "MAKAN", "MINUM", "MENYIAPKAN", "MENGADUK", "MENGGORENG", "MEREBUS"],
        O: ["NASI", "IKAN", "AYAM", "SAYUR", "SAMBAL", "SUP", "ROTI", "TEH"],
        K: ["DI DAPUR", "PAGI INI", "DENGAN CEPAT", "UNTUK KELUARGA", "SEBELUM SARAPAN", "DENGAN HATI-HATI", "DI RUMAH"]
    },
    {
        tema: "Hewan Liar",
        S: ["KUCING", "ANJING", "HARIMAU", "ELANG", "SINGA", "SERIGALA", "BERUANG"],
        P: ["MENGEJAR", "MENGGIGIT", "MELIHAT", "MENANGKAP", "MENGAWASI", "MENGINTAI", "MENYERANG"],
        O: ["TIKUS", "BURUNG", "MANGSA", "KELINCI", "RUSA", "SERANGGA", "KADAL"],
        K: ["DI TAMAN", "DI HUTAN", "DENGAN GANAS", "HARI INI", "DI BALIK POHON", "SAAT SENJA", "DENGAN SIGAP"]
    },
    {
        tema: "Olahraga",
        S: ["ATLET", "PELATIH", "KAPTEN", "PEMAIN", "WASIT", "TIM", "JUARA"],
        P: ["MENENDANG", "MELEMPAR", "MEMBAWA", "MENANGKAP", "MENGOPER", "MENGANGKAT", "MEREBUT"],
        O: ["BOLA", "SEPATU", "JERSEY", "PIALA", "RAKET", "MEDALI", "TONGKAT"],
        K: ["DI LAPANGAN", "SORE HARI", "DENGAN KUAT", "DI STADION", "SELAMA LATIHAN", "PADA BABAK AKHIR", "DENGAN SEMANGAT"]
    },
    {
        tema: "Sekolah",
        S: ["MURID", "KETUA", "SEKRETARIS", "KELOMPOK", "SAHABAT", "TEMAN", "PESERTA"],
        P: ["MENGERJAKAN", "MENJAWAB", "MENYUSUN", "MENGUMPULKAN", "MEMPRESENTASIKAN", "MEMERIKSA", "MENGHAFAL"],
        O: ["SOAL", "TUGAS", "LAPORAN", "JADWAL", "PROYEK", "RANGKUMAN", "PETA"],
        K: ["DI KELAS", "PADA JAM PERTAMA", "BERSAMA KELOMPOK", "SEBELUM ISTIRAHAT", "DENGAN TELITI", "DI PAPAN TULIS"]
    },
    {
        tema: "Teknologi",
        S: ["PROGRAMER", "ADMIN", "DESAINER", "OPERATOR", "TEKNISI", "PENGGUNA", "ANALIS"],
        P: ["MEMBUAT", "MENGUJI", "MEMPERBAIKI", "MENGIRIM", "MENGUNDUH", "MENYIMPAN", "MEMASANG"],
        O: ["APLIKASI", "DATA", "KODE", "SISTEM", "DOKUMEN", "PESAN", "GAMBAR"],
        K: ["DI LAB", "MELALUI INTERNET", "DENGAN KOMPUTER", "PADA SIANG HARI", "SECARA BERKALA", "UNTUK PENGGUNA"]
    },
    {
        tema: "Kesehatan",
        S: ["DOKTER", "PERAWAT", "PASIEN", "APOTEKER", "BIDAN", "RELAWAN", "PETUGAS"],
        P: ["MEMERIKSA", "MERAWAT", "MEMBERIKAN", "MENGUKUR", "MEMINUM", "MENCUCI", "MENGGUNAKAN"],
        O: ["OBAT", "VITAMIN", "MASKER", "SUHU", "LUKA", "TANGAN", "PERBAN"],
        K: ["DI KLINIK", "SETIAP PAGI", "DENGAN SABAR", "SEBELUM TIDUR", "DI RUANG RAWAT", "SAAT PEMERIKSAAN"]
    },
    {
        tema: "Transportasi",
        S: ["SOPIR", "PILOT", "MASINIS", "PENUMPANG", "KONDEKTUR", "KURIR", "PENGENDARA"],
        P: ["MENGENDARAI", "MENGEMUDIKAN", "MENUNGGU", "MEMARKIR", "MEMBELI", "MENGANTAR", "MEMBAWA"],
        O: ["MOBIL", "BUS", "KERETA", "TIKET", "PAKET", "HELM", "KOPER"],
        K: ["DI TERMINAL", "DI STASIUN", "PADA PAGI HARI", "DENGAN AMAN", "SEBELUM BERANGKAT", "DI BANDARA"]
    },
    {
        tema: "Lingkungan",
        S: ["PETANI", "WARGA", "PECINTA", "PENJAGA", "KOMUNITAS", "TETANGGA", "PEMUDA"],
        P: ["MENANAM", "MENYIRAM", "MEMBERSIHKAN", "MENGANGKUT", "MEMILAH", "MENGUMPULKAN", "MERAWAT"],
        O: ["POHON", "BUNGA", "SAMPAH", "DAUN", "TANAMAN", "PUPUK", "PLASTIK"],
        K: ["DI TAMAN KOTA", "SETIAP MINGGU", "DENGAN SUKARELA", "PADA HARI LIBUR", "DI TEPI SUNGAI", "BERSAMA WARGA"]
    },
    {
        tema: "Seni",
        S: ["PELUKIS", "PENARI", "MUSISI", "AKTOR", "SUTRADARA", "PENYANYI", "KREATOR"],
        P: ["MELUKIS", "MENARI", "MEMAINKAN", "MENYANYIKAN", "MEREKAM", "MENGARAHKAN", "MENCIPTAKAN"],
        O: ["LAGU", "TARIAN", "DRAMA", "LUKISAN", "ADEGAN", "MUSIK", "NASKAH"],
        K: ["DI PANGGUNG", "DENGAN INDAH", "SAAT FESTIVAL", "DI STUDIO", "PADA MALAM PENTAS", "UNTUK PENONTON"]
    },
    {
        tema: "Pasar",
        S: ["PEDAGANG", "PEMBELI", "KASIR", "PENJUAL", "PELANGGAN", "PEKERJA", "PENGELOLA"],
        P: ["MENJUAL", "MEMBELI", "MENAWAR", "MENIMBANG", "MEMBAYAR", "MENGHITUNG", "MENATA"],
        O: ["BUAH", "SAYURAN", "DAGING", "TELUR", "HARGA", "UANG", "BARANG"],
        K: ["DI PASAR", "PAGI-PAGI", "DENGAN RAMAH", "SEBELUM SIANG", "DI TOKO", "UNTUK DAGANGAN"]
    },
    {
        tema: "Rumah",
        S: ["RANI", "DINA", "TOMI", "KAKEK", "BIBI", "SAUDARA", "KELUARGA"],
        P: ["MERAPIKAN", "MEMBUKA", "MENUTUP", "MENGAMBIL", "MEMINDAHKAN", "MENCARI", "MEMBERSIHKAN"],
        O: ["KAMAR", "PINTU", "JENDELA", "MEJA", "KURSI", "LAMPU", "PAKAIAN"],
        K: ["DI RUMAH", "SETELAH MAKAN", "DENGAN RAPI", "PADA AKHIR PEKAN", "SEBELUM TAMU DATANG", "DI RUANG TAMU"]
    }
];

const lexicon = { 'S': [], 'P': [], 'O': [], 'K': [] };

dataKamus.forEach(tema => {
    lexicon.S.push(...tema.S);
    lexicon.P.push(...tema.P);
    lexicon.O.push(...tema.O);
    lexicon.K.push(...tema.K);
});
