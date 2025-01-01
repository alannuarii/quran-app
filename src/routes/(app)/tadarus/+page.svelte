<script>
	import Tadarus from '$lib/components/modals/Tadarus.svelte';
</script>

<section>
	<div class="card p-3 rounded-4">
		<div class="d-flex justify-content-between align-items-center">
			<h3 class="text-center">Tadarus Al-Quran</h3>
			<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
				>Create</button
			>
			<Tadarus />
		</div>
	</div>
	<hr />
	<div class="card">tes</div>
</section>

<style>
	h3 {
		margin: 0;
	}
</style>
