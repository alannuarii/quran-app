<script>
	export let data;

	const plan = data?.plan;
</script>

<section>
	<div class="card p-3 rounded-4">
		<div class="row align-items-center mb-3">
			<div class="col-8 col-md-10">
				<h6>ID: <span class="fw-bold">{plan[0].id}</span></h6>
			</div>
			<div class="col-4 col-md-2">
				<button class="btn btn-sm btn-success">Invite Link</button>
			</div>
		</div>
		<div class="border rounded-4 py-2 px-3">
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
				<div class="col-3 col-md-2 text-center"><h6 class="fw-bolder">100%</h6></div>
			</div>
			<hr />
			<p>Target Khatam <span class="fw-bold">{plan[0].targetKhatam}</span></p>
			<p>Inisiator <span class="fw-bold">{plan[0].name}</span></p>
		</div>
	</div>
</section>

<style>
	p {
		margin: 0px;
		font-size: 0.8em;
	}
	h6 {
		font-size: 0.9em;
		margin: 0px;
	}
</style>
