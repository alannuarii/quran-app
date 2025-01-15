<script>
	import surah from '../quran/surah/114.json';

	const convertToArabicNumbers = (number) => {
		return number.toString().replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit]);
	};
</script>

<div class="card px-md-5 px-3 py-4 rounded-5">
	<div class="container">
		<h3 class="text-center fw-bold mb-4">Surah An-Nas</h3>

		{#each surah.data as ayah}
			<div class="ayah mb-4">
				<p class="ayah-text fw-bold">
					{ayah.aya_text}
					<span class="ayah-number">({convertToArabicNumbers(ayah.aya_number)})</span>
				</p>
				<p class="text-muted">
					{ayah.translation_aya_text}
				</p>
			</div>
		{/each}
	</div>
</div>

<style>
	h3 {
		margin: 0px;
	}
	/* Tambahkan font dan pengaturan teks Arab */
	.ayah-text {
		font-family: 'Amiri', serif; /* Gunakan font Arab */
		font-size: 1.5rem;
		direction: rtl; /* Teks dari kanan ke kiri */
		text-align: right;
		cursor: pointer;
	}
	.ayah-number {
		font-size: 0.9em;
		color: #6c757d; /* Warna abu-abu (opsional, sesuai Bootstrap 5) */
		margin-left: 5px; /* Jarak kecil dari teks ayat */
		direction: rtl; /* Pastikan nomor tetap sesuai arah teks Arab */
	}
</style>
