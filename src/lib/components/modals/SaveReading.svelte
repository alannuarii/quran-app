<script>
	import surah from '../../quran/surah.json';

	export let juzId;
	export let suraId;
	export let numberPage;
	export let id;
	export let startData;

	const allSurah = surah.data;
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
							id="floatingID"
							placeholder="ID Plan"
							name="end_juz"
							value={juzId}
							readonly
						/>
						<label for="floatingInput">Juz</label>
					</div>
					<input type="hidden" name="end_surah" value={suraId} />
					<div class="form-floating mb-3">
						<input
							type="text"
							class="form-control"
							id="floatingID"
							placeholder="ID Plan"
							value={allSurah[suraId - 1].surat_name}
							readonly
						/>
						<label for="floatingInput">Surah</label>
					</div>
					<div class="form-floating mb-3">
						<input
							type="number"
							class="form-control"
							id="floatingID"
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
							class="form-control"
							id="floatingID"
							placeholder="ID Plan"
							name="end_ayat"
							required
						/>
						<label for="floatingInput">Ayat</label>
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
