<script>
	import { onMount } from 'svelte';
	import quran from '$lib/quran/quran.json';
	import surah from '$lib/quran/surah.json';
	import SaveReading from '$lib/components/modals/SaveReading.svelte';
	import InputPageNumber from '$lib/components/modals/InputPageNumber.svelte';

	export let data;

	const alQuran = quran.data;
	const allSurah = surah.data;

	const memberId = data?.memberId;
	const juz = data?.juz[0].juz;
	const lastRead = data?.lastRead[0];

	let startDataTadarus = [];

	if (lastRead) {
		startDataTadarus = alQuran.find(
			(item) => item.juz_id === lastRead.juz && item.aya_number === lastRead.ayat
		);
	} else {
		startDataTadarus = alQuran.find((item) => item.juz_id === juz);
	}

	// Initialize the current page number
	let currentPage = data.pageNumber;

	const convertToArabicNumbers = (number) => {
		return number.toString().replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit]);
	};

	// Reactive statement to get verses for the current page
	let itemsOnPage = '';
	let suraId = '';
	let arraySurah = [];
	let juzId = '';

	$: {
		const versesOnCurrentPage = alQuran.filter((item) => item.page_number === currentPage);
		itemsOnPage = versesOnCurrentPage
			.map((item) => {
				// Check if the aya_number is 1 and sura_id is greater than 1
				if (item.aya_number === 1 && item.sura_id > 1) {
					return `<div class="text-center mt-4"><h6 class="fw-bold">Surah ${allSurah[item.sura_id - 1].surat_name}</h6><hr></div><div class="text-center fw-bold text-success-emphasis">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</div>${item.aya_text} (${convertToArabicNumbers(item.aya_number)})`;
				} else if (item.aya_number === 1) {
					return `<div class="text-center mt-4"><h6 class="fw-bold">Surah ${allSurah[item.sura_id - 1].surat_name}</h6><hr></div>${item.aya_text} (${convertToArabicNumbers(item.aya_number)})`;
				}
				return `${item.aya_text} (${convertToArabicNumbers(item.aya_number)})`;
			})
			.join(' ');

		// Get sura_id and juz_id from the first verse of the current page
		if (versesOnCurrentPage.length > 0) {
			suraId = versesOnCurrentPage[0].sura_id;
			juzId = versesOnCurrentPage[0].juz_id;

			// Create a new array of unique sura_ids
			const suraIds = versesOnCurrentPage.map((item) => item.sura_id);
			const uniqueSuraIds = [...new Set(suraIds)];

			// Assign the unique sura IDs to arraySurah
			arraySurah = uniqueSuraIds; // This makes arraySurah reactive
		} else {
			arraySurah = []; // Reset if no verses are found
		}
	}

	// Function to navigate to a different page
	const navigateToPage = (newPageNumber) => {
		if (newPageNumber > 0 && newPageNumber <= getMaxPageNumber()) {
			currentPage = newPageNumber; // Update the current page
		}
	};

	// Function to get the maximum page number based on the data
	const getMaxPageNumber = () => {
		const maxPage = Math.max(...alQuran.map((item) => item.page_number));
		return maxPage;
	};
</script>

<section>
	<div class="card shadow px-md-5 px-4 pt-4 rounded-5 mb-2">
		<div class="juz mb-1 d-flex justify-content-between align-items-center">
			<h5
				class="text-mb-end text-center btn btn-sm btn-secondary"
				data-bs-toggle="modal"
				data-bs-target="#savereading"
			>
				<i class="bi-floppy me-2"></i>Simpan
			</h5>
			<h5 class="text-mb-end text-center">
				<span class="badge text-bg-success">JUZ {juzId}</span>
			</h5>
			<SaveReading
				{juzId}
				{suraId}
				numberPage={currentPage}
				id={memberId}
				startData={startDataTadarus}
			/>
		</div>
		<!-- Use @html to render the HTML content -->
		<p class="ayah-text">{@html itemsOnPage}</p>
	</div>
	<div class="d-flex justify-content-center">
		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<p
						class="btn page-link rounded-0"
						on:click={() => navigateToPage(currentPage + 1)}
						disabled={currentPage <= 1}
						aria-label="Previous"
					>
						<span aria-hidden="true">&laquo;</span>
					</p>
				</li>
				<li class="page-item">
					<p
						class="page-link text-dark fw-bold btn rounded-0"
						data-bs-toggle="modal"
						data-bs-target="#inputpagenumber"
					>
						Halaman {currentPage}
					</p>
					<InputPageNumber />
				</li>
				<li class="page-item">
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<p
						class="page-link btn rounded-0"
						on:click={() => navigateToPage(currentPage - 1)}
						disabled={currentPage >= getMaxPageNumber()}
						aria-label="Next"
					>
						<span aria-hidden="true">&raquo;</span>
					</p>
				</li>
			</ul>
		</nav>
	</div>
</section>

<style>
	/* Tambahkan font dan pengaturan teks Arab */
	.ayah-text {
		font-family: 'Amiri', serif; /* Gunakan font Arab */
		font-size: 1.5rem;
		direction: rtl; /* Teks dari kanan ke kiri */
		text-align: right;
		cursor: pointer;
		line-height: 3; /* Menambahkan jarak antar baris untuk keterbacaan */
		margin-bottom: 1.5rem; /* Menambahkan margin bawah untuk keterbacaan */
		font-weight: 500;
	}
	.juz {
		margin-bottom: -30px;
	}
	h5 {
		margin: 0px;
	}
	p {
		margin: 0px;
	}
</style>
