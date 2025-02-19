<script>
	import Timer from '$lib/components/Timer.svelte';
	import { surahName } from '../../lib/utils/helper';

	export let data;

	const user = data.user;

	const tadarus = data?.tadarus;

	const latestData = Object.values(
		tadarus.reduce((acc, item) => {
			if (!item.createdAt) return acc; // Skip jika createdAt null

			const id = item.idPlan;
			if (!acc[id] || new Date(item.createdAt) > new Date(acc[id].createdAt)) {
				acc[id] = item;
			}
			return acc;
		}, {})
	);
</script>

<section>
	<div class="card p-4 rounded-4">
		<div>
			<div class="text-end mb-2"><Timer /></div>
			<h3>Assalamualaikum,</h3>
			<h2>{user.name}</h2>
		</div>
		<hr />
		{#if tadarus}
			<div class="card p-3 rounded-4">
				<h5>Bacaan Terakhir</h5>
				<div>
					{#each latestData as tad}
						<div class="card mb-2">
							<h6 class="card-header">
								<div class="form-floating">
									<input
										type="email"
										class="form-control form-control-sm"
										id="floatingInput"
										placeholder="name@example.com"
										value={tad.idPlan}
										disabled
									/>
									<label for="floatingInput">ID Plan</label>
								</div>
							</h6>
							<div class="card-body">
								<div class="d-flex justify-content-evenly my-1">
									<p>Juz {tad.juz}</p>
									<!-- Tampilkan nama Surah hanya di layar ≥ md -->
									<p class="d-none d-md-block">Surah {surahName(tad.surah)}</p>
									<!-- Tampilkan ID Surah hanya di layar < md -->
									<p class="d-md-none">Surah {tad.surah}</p>
									<p>Ayat {tad.ayat}</p>
								</div>
								<a href="/quran/member/{tad.idMember}/{tad.page}" class="btn btn-success w-100"
									>Lanjut</a
								>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="text-center py-5">
				<p>Anda belum memiliki plan tadarus</p>
				<a href="/tadarus" class="btn btn-success">BUAT PLAN</a>
			</div>
		{/if}
	</div>
</section>

<style>
	h3 {
		font-weight: 400;
		margin: 0px;
	}
	h2 {
		font-weight: 700;
		margin: 0px;
	}
	h6,
	p,
	a {
		margin: 0px;
	}
</style>
