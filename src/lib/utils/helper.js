import surah from '../quran/surah.json'
import { ayatPerSurah, ayatPerJuz } from '../quran/ayat'

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

export const countAmountAyat = (surahAwal, ayatAwal, surahAkhir, ayatAkhir) => {
    let totalAyat = 0;

    // Jika surah awal dan akhir sama
    if (surahAwal === surahAkhir) {
        totalAyat = ayatAkhir - ayatAwal + 1;
    } else {
        // Hitung ayat dari ayat awal sampai akhir surah pertama
        totalAyat += ayatPerSurah[surahAwal - 1] - ayatAwal + 1;

        // Hitung ayat dari surah kedua sampai sebelum surah akhir
        for (let i = surahAwal; i < surahAkhir - 1; i++) {
            totalAyat += ayatPerSurah[i];
        }

        // Hitung ayat dari awal surah akhir sampai ayat akhir
        totalAyat += ayatAkhir;
    }

    return totalAyat;
}

export const transformJuzRange = (data) => {
    // Mengelompokkan data berdasarkan nama
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = {
                name: item.name,
                juz: [],
                totalAmount: item.totalAmount,
                totalAyat: 0
            };
        }
        acc[item.name].juz.push(item.juz);
        return acc;
    }, {});

    // Mengubah format dan menghitung totalAyat
    const result = Object.values(groupedData).map(group => {
        const minJuz = Math.min(...group.juz);
        const maxJuz = Math.max(...group.juz);
        const totalAyat = group.juz.reduce((sum, juz) => sum + ayatPerJuz[juz - 1], 0); // Menghitung total ayat

        return {
            name: group.name,
            juz: `Juz ${minJuz} - ${maxJuz}`,
            totalAmount: group.totalAmount, // Tidak dijumlahkan, hanya diambil dari item pertama
            totalAyat: totalAyat
        };
    });

    return result;
}