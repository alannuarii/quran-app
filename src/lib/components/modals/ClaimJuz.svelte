<script>
	export let id;
	export let juz;
</script>

<div
	class="modal fade"
	id="claim{juz.replace(/\s+/g, '')}"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-4">
			<div class="modal-body text-center">
				<p>Anda akan mengambil bacaan {juz}</p>
			</div>
			<div class="modal-footer d-flex justify-content-center">
				<form action="?/claim" method="post">
					<input type="hidden" name="id" value={id} />
					<input type="hidden" name="juz" value={juz} />
					<button class="btn btn-sm btn-success" type="submit">Ya!</button>
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
