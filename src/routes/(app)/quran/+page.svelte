<script>
	import quran from '../../../lib/quran/quran.json';
	import surah from '../../../lib/quran/surah.json';
	import { removeDuplicates } from '../../../lib/utils/helper';

	const alQuran = quran.data;
	const allSurah = surah.data;

	// Menghapus duplikasi dari juz_id
	const arrayJuz = removeDuplicates(alQuran.map((item) => item.juz_id));

	// Membuat array untuk menyimpan halaman awal dari setiap juz
	const juzPages = arrayJuz
		.map((juzId) => {
			// Temukan halaman pertama untuk setiap juz
			const firstPage = alQuran.find((item) => item.juz_id === juzId);
			return firstPage ? firstPage.page_number : null; // Kembalikan page_number atau null jika tidak ditemukan
		})
		.filter((page) => page !== null); // Menghapus nilai null dari hasil

	const surahPages = alQuran.reduce((acc, item) => {
		// Jika aya_number adalah 1, tambahkan page_number ke accumulator
		if (item.aya_number === 1) {
			acc.push(item.page_number);
		}
		return acc; // Kembalikan accumulator
	}, []); // Inisialisasi accumulator sebagai array kosong
</script>

<section>
	<div class="card p-3 rounded-4">
		<div>
			<!-- Nav tabs -->
			<ul class="nav nav-underline d-flex justify-content-evenly" id="myTab" role="tablist">
				<li class="nav-item" role="presentation">
					<button
						class="nav-link active"
						id="surah-tab"
						data-bs-toggle="tab"
						data-bs-target="#surah"
						type="button"
						role="tab"
						aria-controls="surah"
						aria-selected="false"
					>
						Surah
					</button>
				</li>
				<li class="nav-item" role="presentation">
					<button
						class="nav-link"
						id="juz-tab"
						data-bs-toggle="tab"
						data-bs-target="#juz"
						type="button"
						role="tab"
						aria-controls="juz"
						aria-selected="true"
					>
						Juz
					</button>
				</li>
			</ul>
			<hr />
			<!-- Tab content -->
			<div class="tab-content" id="myTabContent">
				<div
					class="tab-pane fade show active"
					id="surah"
					role="tabpanel"
					aria-labelledby="surah-tab"
				>
					<ol class="list-group list-group-numbered">
						{#each allSurah as sura, index}
							<a
								href="/quran/{surahPages[index]}"
								class="list-group-item d-flex justify-content-between align-items-start"
							>
								<div class="ms-2 me-auto">
									<div class="fw-bold">
										{sura.surat_name} <span class="ayah-text ms-2">{sura.surat_text}</span>
									</div>
									{sura.surat_terjemahan}
								</div>
								<span class="badge text-bg-secondary rounded-pill">{sura.count_ayat} Ayat</span>
							</a>
						{/each}
					</ol>
				</div>
				<div class="tab-pane fade" id="juz" role="tabpanel" aria-labelledby="juz-tab">
					<div class="list-group">
						{#each arrayJuz as juz}
							<a
								href="/quran/{juzPages[juz - 1]}"
								class="list-group-item list-group-item-action fw-bold">Juz {juz}</a
							>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.ayah-text {
		font-family: 'Amiri', serif;
		font-weight: 500;
	}
	a:hover {
		color: #0d6efd;
		background-color: transparent;
	}
</style>
