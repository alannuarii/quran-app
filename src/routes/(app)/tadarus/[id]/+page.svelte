<script>
	import Share from '$lib/components/modals/Share.svelte';

	export let data;

	const plan = data?.plan;

	let jumlahJuz = Array.from({ length: 30 }, (_, i) => i + 1);
</script>

<section>
	<div class="card p-3 rounded-4">
		<div class="row align-items-center mb-3 g-3">
			<div class="col-8 col-md-10">
				<div class="input-group flex-nowrap">
					<span class="input-group-text fw-bold" id="addon-wrapping">ID</span>
					<input
						type="text"
						class="form-control fw-bold"
						placeholder="ID"
						aria-label="ID"
						aria-describedby="addon-wrapping"
						value={plan[0].id}
						disabled
					/>
				</div>
			</div>
			<div class="col-4 col-md-2">
				<button
					class="btn btn-sm btn-success w-100"
					data-bs-toggle="modal"
					data-bs-target="#id{plan[0].id}">Invite Link</button
				>
				<Share id={plan[0].id} />
			</div>
		</div>
		<div class="border rounded-4 py-2 px-3 mb-3">
			<p class="mb-2 text-center">Progres Keseluruhan</p>
			<div class="row mb-2">
				<div class="col-9 col-md-10">
					<div
						class="progress"
						role="progressbar"
						aria-label="Success striped example"
						aria-valuenow="25"
						aria-valuemin="0"
						aria-valuemax="100"
					>
						<div class="progress-bar progress-bar-striped bg-success" style="width: 25%"></div>
					</div>
				</div>
				<div class="col-3 col-md-2 text-center"><h6 class="fw-bolder">25%</h6></div>
			</div>
			<hr />
			<div class="row">
				<div class="col-md-4">
					<p>Target Khatam <span class="fw-bold">{plan[0].targetKhatam}</span></p>
					<p>Inisiator <span class="fw-bold">{plan[0].name}</span></p>
				</div>
				<div class="col-md-8 text-md-end list-btn mt-2 mt-md-0 mb-2 mb-md-0">
					<button class="btn btn-sm btn-secondary">Riwayat Tadarusku</button>
					<button class="btn btn-sm btn-secondary">Riwayat Anggota</button>
					<button class="btn btn-sm btn-danger">Hapus</button>
				</div>
			</div>
		</div>
		<div class="card juz py-2 px-5 rounded-4">
			<h6 class="text-center fw-bold mb-3">Daftar Pembagian</h6>
			<ul class="list-group list-group-flush">
				{#each jumlahJuz as juz}
					<li class="list-group-item d-flex justify-content-around align-items-center">
						<p>Juz {juz}</p>
						<button class="btn btn-sm btn-success klaim"><span>Klaim</span></button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	p {
		margin: 0px;
		font-size: 0.8em;
	}
	input {
		font-size: 0.9em;
	}
	.list-btn button {
		font-size: 0.7em;
	}
	.juz {
		height: 40vh;
		overflow-y: auto;
	}
	.klaim {
		font-size: 0.5em;
	}
</style>
