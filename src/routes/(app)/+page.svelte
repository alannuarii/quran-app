<script>
	import Timer from '$lib/components/Timer.svelte';
	import { surahName, transformJuzRange } from '../../lib/utils/helper';

	export let data;

	const user = data.user;

	const tadarus = data?.tadarus;

	const latestData = Object.values(
		tadarus.reduce((acc, item) => {
			const id = item.idPlan;
			if (!acc[id] || new Date(item.createdAt) > new Date(acc[id].createdAt)) {
				acc[id] = item;
			}
			return acc;
		}, {})
	);

	function splitByIdMember(data) {
		const grouped = data.reduce((result, item) => {
			if (!result[item.idMember]) {
				result[item.idMember] = [];
			}
			result[item.idMember].push(item);
			return result;
		}, {});

		return Object.values(grouped);
	}

	const splitProgress = splitByIdMember(data.progress);
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
					{#each latestData as tad, index}
						{#if (transformJuzRange(splitProgress[index])[0].totalAmount / transformJuzRange(splitProgress[index])[0].totalAyat) * 100 !== 100}
							<div class="card mb-2 border-3 rounded-4">
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
									{#if tad.surah}
										<div class="d-flex justify-content-evenly my-1">
											<p class="fst-italic">Juz {tad.juz}</p>
											<!-- Tampilkan nama Surah hanya di layar ≥ md -->
											<p class="d-none d-md-block fst-italic">Surah {surahName(tad.surah)}</p>
											<!-- Tampilkan ID Surah hanya di layar < md -->
											<p class="d-md-none fst-italic">Surah {tad.surah}</p>
											<p class="fst-italic">Ayat {tad.ayat}</p>
										</div>
										<div class="btn-group w-100">
											<a href="/quran/member/{tad.idMember}/{tad.page}" class="btn btn-success"
												>Lanjut</a
											>
											<a href="/tadarus/{tad.idPlan}" class="btn btn-secondary">Progres</a>
										</div>
									{:else}
										<a href="/tadarus/{tad.idPlan}" class="btn btn-success w-100">Mulai Tadarus</a>
									{/if}
								</div>
							</div>
						{/if}
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
		color: #2a9d8f;
	}
	h6,
	p,
	a {
		margin: 0px;
	}
</style>
