<script>
	import { generateRandomCode } from '../../utils/random';
	import { getNextWeekDate } from '../../utils/date';

	export let name;

	let jumlahAnggota = Array.from({ length: 30 }, (_, i) => i + 1);
</script>

<div
	class="modal fade"
	id="tadarus"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-4">
			<div class="modal-header">
				<h5 class="modal-title fw-bold" id="exampleModalLabel">Create Plan</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<form method="post">
				<div class="modal-body">
					<div class="form-floating mb-3">
						<input
							type="text"
							class="form-control"
							id="floatingID"
							placeholder="ID Plan"
							name="id"
							value={generateRandomCode()}
							readonly
						/>
						<label for="floatingInput">ID Plan</label>
					</div>
					<div class="form-floating mb-3">
						<input
							type="date"
							class="form-control"
							id="floatingTarget"
							placeholder="Target Khatam"
							name="target"
							value={getNextWeekDate()}
						/>
						<label for="floatingInput">Target Khatam</label>
					</div>
					<div class="form-floating">
						<select
							class="form-select"
							id="floatingSelect"
							aria-label="Floating label select example"
							name="members"
						>
							<option selected disabled>Pilih jumlah anggota</option>

							{#each jumlahAnggota as jml}
								<option value={jml}>{jml} orang</option>
							{/each}
						</select>
						<label for="floatingSelect">Jumlah Anggota</label>
					</div>
				</div>
				<div class="modal-footer">
					<input type="hidden" name="name" value={name} />
					<button type="submit" class="btn btn-success">Kirim</button>
				</div>
			</form>
		</div>
	</div>
</div>
