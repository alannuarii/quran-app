<script>
	import surah from '../../quran/surah.json';

	export let juzId;
	export let arraySurah;
	export let numberPage;

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
							name="juz"
							value={juzId}
						/>
						<label for="floatingInput">Juz</label>
					</div>
					<div class="form-floating mb-3">
						<select
							class="form-select"
							id="floatingSelect"
							aria-label="Floating label select example"
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
							id="floatingID"
							placeholder="ID Plan"
							name="page_number"
							value={numberPage}
						/>
						<label for="floatingInput">Halaman</label>
					</div>
					<div class="form-floating mb-3">
						<input
							type="number"
							class="form-control"
							id="floatingID"
							placeholder="ID Plan"
							name="ayat"
						/>
						<label for="floatingInput">Ayat</label>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-success">Kirim</button>
				</div>
			</form>
		</div>
	</div>
</div>
