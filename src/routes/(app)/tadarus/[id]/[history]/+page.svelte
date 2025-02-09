<script>
	import { formatDateTime } from '$lib/utils/date.js';
	import { surahName } from '$lib/utils/helper.js';

	export let data;

	const progress = data?.progress;
</script>

<section>
	<div>
		<h4 class="fw-bold text-center">RIWAYAT BACAAN</h4>
	</div>
	<hr />
	<!-- Mobile Version -->
	<ol class="list-group list-group-numbered d-block d-md-none">
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

	<!-- Desktop Version -->
	<div class="d-none d-md-block">
		<table class="table table-bordered w-100">
			<thead class="text-center">
				<tr class="table-secondary">
					<th class="align-middle" rowspan="2">No</th>
					<th class="align-middle" rowspan="2">Tanggal Baca</th>
					<th colspan="3">Bacaan Terakhir</th>
					<th class="align-middle" rowspan="2">Jumlah Ayat</th>
				</tr>
				<tr class="table-secondary">
					<th>Juz</th>
					<th>Surah</th>
					<th>Ayat</th>
				</tr>
			</thead>
			<tbody>
				{#each progress as pr, index}
					<tr class="text-center">
						<td>{index + 1}</td>
						<td>{formatDateTime(pr.time)}</td>
						<td>{pr.juz}</td>
						<td>{surahName(pr.surah)}</td>
						<td>{pr.ayat}</td>
						<td>{pr.amount}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
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
	th,
	td {
		font-size: 0.8rem;
	}
</style>
