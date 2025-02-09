<script>
	import Tadarus from '$lib/components/modals/Tadarus.svelte';

	export let data;

	const plans = data?.plans;
	const name = data?.name;

</script>

<section>
	<div class="card p-3 rounded-4 bg-light">
		<div class="d-flex justify-content-between align-items-center">
			<h3 class="text-center">Tadarus Al-Quran</h3>
			<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#tadarus"
				>Create</button
			>
			<Tadarus {name} />
		</div>
	</div>
	<hr />
	{#each plans as plan}
		<a
			href="/tadarus/{plan.planId}"
			class="card p-3 mb-1 btn btn-outline-success text-dark bg-light rounded-4"
		>
			<div class="d-flex justify-content-between align-items-center">
				<div class="text-center">
					<p>Inisiator</p>
					<h6>{plan.planName}</h6>
				</div>
				<div class="text-center">
					<p>Jumlah Anggota</p>
					<h6>{plan.membersCount}/{plan.members}</h6>
				</div>
				<div class="text-center">
					<p>Target Khatam</p>
					<h6>{plan.targetKhatam}</h6>
				</div>
			</div>
		</a>
	{/each}
</section>

<style>
	h3,
	h6 {
		margin: 0;
	}
	h6 {
		font-weight: 600;
	}
	p {
		margin: 0;
		font-weight: 100;
		font-size: 0.5em;
	}
</style>
