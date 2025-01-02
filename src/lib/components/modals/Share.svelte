<script>
	export let id;
</script>

<div class="modal fade" {id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row align-items-center">
					<div class="col-10">
						<input
							type="text"
							class="form-control"
							placeholder="First name"
							aria-label="First name"
							value={id}
							readonly
						/>
					</div>
					<div class="col-2">
						<button class="btn btn-sm btn-success">Salin</button>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<p>Bagikan link berikut via</p>
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="btn btn-light border"><i class="bi-whatsapp"></i></button>
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="btn btn-light border"><i class="bi-google"></i></button>
			</div>
		</div>
	</div>
</div>

<style>
	.modal-footer p {
		font-size: 0.9em;
	}
</style>
