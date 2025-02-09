import surah from '../quran/surah.json'

export const removeDuplicates = (array) => {
    // Create a Set from the array to automatically filter out duplicates  
    const uniqueSet = new Set(array);

    // Convert the Set back to an array  
    const uniqueArray = Array.from(uniqueSet);

    return uniqueArray;
}

export const distributeJuz = (totalMembers) => {
    const juzPerMember = Math.floor(30 / totalMembers);
    const remainingJuz = 30 % totalMembers;

    const distribution = [];

    for (let i = 0; i < totalMembers; i++) {
        const juz = juzPerMember + (i < remainingJuz ? 1 : 0);
        distribution.push(juz);
    }

    return distribution;
}

export const generateJuzRanges = (juzDistribution) => {
    let startJuz = 1;
    const juzRanges = [];

    for (const juzCount of juzDistribution) {
        const endJuz = startJuz + juzCount - 1;
        juzRanges.push(`Juz ${startJuz} - ${endJuz}`);
        startJuz = endJuz + 1;
    }

    return juzRanges;
}

export const parseJuzRange = (juzRange) => {
    // Menggunakan regex untuk mengekstrak angka dari string
    const regex = /Juz (\d+) - (\d+)/;
    const match = juzRange.match(regex);

    if (match) {
        const start = parseInt(match[1], 10); // Mengambil angka pertama
        const end = parseInt(match[2], 10);   // Mengambil angka kedua

        // Membuat array dari start hingga end
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    } else {
        throw new Error("Format input tidak valid. Harus dalam format 'Juz X - Y'.");
    }
}

export const extractJuzNumbers = (juzString) => {
    // Menggunakan regex untuk mengekstrak angka dari string
    const regex = /Juz (\d+) - (\d+)/;
    const match = juzString.match(regex);

    if (match) {
        // Mengubah angka yang diekstrak menjadi integer
        const startJuz = parseInt(match[1], 10); // Angka pertama setelah "Juz"

        return startJuz; // Mengembalikan array dengan kedua angka
    } else {
        throw new Error("Format string tidak valid");
    }
}

export const surahName = (surahNumber) => {

    const allSurah = surah.data;

    const findSurah = allSurah.find((item) => item.id === surahNumber);

    return findSurah.surat_name
}

const arraySurah = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109,
    123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
    112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
    34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
    54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
    60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44,
    28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
    29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3,
    5, 4, 5, 6
];

export function countAmountAyat(surahAwal, ayatAwal, surahAkhir, ayatAkhir) {
    let totalAyat = 0;

    // Jika surah awal dan akhir sama
    if (surahAwal === surahAkhir) {
        totalAyat = ayatAkhir - ayatAwal + 1;
    } else {
        // Hitung ayat dari ayat awal sampai akhir surah pertama
        totalAyat += arraySurah[surahAwal - 1] - ayatAwal + 1;

        // Hitung ayat dari surah kedua sampai sebelum surah akhir
        for (let i = surahAwal; i < surahAkhir - 1; i++) {
            totalAyat += arraySurah[i];
        }

        // Hitung ayat dari awal surah akhir sampai ayat akhir
        totalAyat += ayatAkhir;
    }

    return totalAyat;
}