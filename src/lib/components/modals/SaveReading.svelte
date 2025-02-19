<script>
	import surah from '../../quran/surah.json';
	import quran from '../../quran/quran.json';

	export let juzId;
	// export let suraId;
	export let numberPage;
	export let id;
	export let startData;
	export let arraySurah

	const allSurah = surah.data;
	const alQuran = quran.data;

	// Pastikan ayatRange selalu update ketika numberPage berubah
	$: ayatRange = alQuran.filter((item) => item.page_number === numberPage);
	$: arrayAyatRange = ayatRange.map((item) => item.aya_number);

	// Pastikan firstAyat dan lastAyat tetap aman meskipun ayatRange kosong
	$: firstAyat = ayatRange.length ? ayatRange[0].aya_number : '-';
	$: lastAyat = ayatRange.length ? ayatRange[ayatRange.length - 1].aya_number : '-';

	let ayatInput = '';
	let inputClass = '';

	function validateAyat(event) {
		const value = event.target.value.trim();

		if (value === '') {
			// Jika kosong, tidak menampilkan error
			inputClass = '';
		} else {
			const numericValue = parseInt(value, 10);
			// Validasi angka apakah ada di arrayAyatRange
			if (arrayAyatRange.includes(numericValue)) {
				inputClass = 'is-valid';
			} else {
				inputClass = 'is-invalid';
			}
		}
	}
</script>

<div
	class="modal fade"
	id="savereading"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-4">
			<div class="modal-header">
				<h5 class="modal-title fw-bold" id="exampleModalLabel">Simpan Bacaan</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<form method="post">
				<div class="modal-body">
					<div class="form-floating mb-3">
						<input
							type="number"
							class="form-control"
							placeholder="ID Plan"
							name="end_juz"
							value={juzId}
							readonly
						/>
						<label for="floatingInput">Juz</label>
					</div>
					<!-- <input type="hidden" name="end_surah" value={suraId} /> -->
					<!-- <div class="form-floating mb-3">
						<input
							type="text"
							class="form-control"
							placeholder="ID Plan"
							value={allSurah[suraId - 1].surat_name}
							readonly
						/>
						<label for="floatingInput">Surah</label>
					</div> -->
					<div class="form-floating mb-3">
						<select
							class="form-select"
							id="floatingSelect"
							aria-label="Floating label select example"
							name="end_surah"
						>
							{#each arraySurah as surah}
								<option value={surah}>{allSurah[surah - 1].surat_name}</option>
							{/each}
						</select>
						<label for="floatingSelect">Surah</label>
					</div>
					<div class="form-floating mb-3">
						<input
							type="number"
							class="form-control"
							placeholder="ID Plan"
							name="end_page_number"
							value={numberPage}
							readonly
						/>
						<label for="floatingInput">Halaman</label>
					</div>
					<div class="form-floating mb-3">
						<input
							type="number"
							class={'form-control ' + inputClass}
							placeholder="Ayat"
							name="end_ayat"
							bind:value={ayatInput}
							on:input={validateAyat}
							required
						/>
						<label for="floatingAyat">Ayat</label>
						<p class="ms-2 mt-2">Ayat {firstAyat} - {lastAyat}</p>
						{#if inputClass === 'is-invalid'}
							<div id="validationServer03Feedback" class="invalid-feedback">Ayat tidak sesuai</div>
						{/if}
					</div>
				</div>
				<div class="modal-footer">
					<input type="hidden" name="id" value={id} />
					<input type="hidden" name="start_juz" value={startData.juz_id} />
					<input type="hidden" name="start_surah" value={startData.sura_id} />
					<input type="hidden" name="start_page_number" value={startData.page_number} />
					<input type="hidden" name="start_ayat" value={startData.aya_number} />
					<button type="submit" class="btn btn-success">Kirim</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	p {
		margin: 0px;
		font-style: italic;
		font-size: 0.9rem;
	}
</style>
