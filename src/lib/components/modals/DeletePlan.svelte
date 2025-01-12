<script>
	export let id;
</script>

<div
	class="modal fade"
	id="deleteplan{id}"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-4">
			<div class="modal-body text-center">
				<p>Apakah Anda yakin?</p>
			</div>
			<div class="modal-footer d-flex justify-content-center">
				<form action="?/deletePlan" method="post">
					<input type="hidden" name="id" value={id} />
					<button class="btn btn-sm btn-danger" type="submit">Ya!</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	p {
		margin: 0px;
		font-size: 0.9em;
	}
</style>
