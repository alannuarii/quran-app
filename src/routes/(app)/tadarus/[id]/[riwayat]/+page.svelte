<script>
	import { formatDateTime } from '$lib/utils/date.js';
	import { surahName } from '$lib/utils/helper.js';

	export let data;

	const progress = data?.progress;
</script>

<section>
	<ol class="list-group list-group-numbered">
		{#each progress as pr}
			<li class="list-group-item d-flex justify-content-between align-items-start">
				<div class="ms-2 me-auto">
					<div class="fw-bold">{formatDateTime(pr.time)}</div>
					<div class="mt-2">
						<h6>Bacaan Terakhir</h6>
						<p>Juz {pr.juz}</p>
						<p>Surah {surahName(pr.surah)}</p>
						<p>Ayat {pr.ayat}</p>
					</div>
				</div>
				<span class="badge text-bg-success rounded-pill">{pr.amount} Ayat</span>
			</li>
		{/each}
	</ol>
</section>

<style>
	p {
		margin: 0px;
		font-size: 0.8rem;
		font-style: italic;
	}
	h6 {
		margin: 0px;
	}
	.badge {
		font-size: 1rem;
	}
</style>
