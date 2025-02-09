<script>
	import Share from '$lib/components/modals/Share.svelte';
	import DeletePlan from '$lib/components/modals/DeletePlan.svelte';
	import ClaimJuz from '$lib/components/modals/ClaimJuz.svelte';
	import quran from '../../../../lib/quran/quran.json';
	import surah from '../../../../lib/quran/surah.json';
	import {
		distributeJuz,
		generateJuzRanges,
		extractJuzNumbers,
		removeDuplicates
	} from '../../../../lib/utils/helper';

	export let data;

	const name = data?.user.name;
	const plan = data?.plan[0];
	const members = data?.plan.map((item) => item.member);
	const juzs = data?.plan.map((item) => item.juz);
	const member = data?.plan.find((item) => item.member === name);

	const tadarus = data?.plan.filter((item) => item.member === name);

	const alQuran = quran.data;

	const arrayJuz = removeDuplicates(alQuran.map((item) => item.juz_id));

	const juzPages = arrayJuz
		.map((juzId) => {
			// Temukan halaman pertama untuk setiap juz
			const firstPage = alQuran.find((item) => item.juz_id === juzId);
			return firstPage ? firstPage.page_number : null;
		})
		.filter((page) => page !== null);

	const page = data?.progress[0]?.page;
	const lastRead = data?.progress[0];

	const allSurah = surah.data;
	const findSurah = allSurah.find((item) => item.id === lastRead?.surah);

	const totalProgress = data?.amount.reduce((sum, item) => sum + item.amount, 0);

	const percenProgress = (totalProgress / 6236) * 100;

	console.log(percenProgress);
</script>

<section>
	{#if members.includes(name)}
		<div class="card p-3 rounded-4">
			<div class="row align-items-center mb-3 g-3">
				<div class="col-8 col-md-10">
					<div class="input-group flex-nowrap">
						<span class="input-group-text fw-bold" id="addon-wrapping">ID</span>
						<input
							type="text"
							class="form-control fw-bold"
							placeholder="ID"
							aria-label="ID"
							aria-describedby="addon-wrapping"
							value={plan.id}
							disabled
						/>
					</div>
				</div>
				<div class="col-4 col-md-2">
					<button
						class="btn btn-sm btn-success w-100"
						data-bs-toggle="modal"
						data-bs-target="#share{plan.id}">Invite Link</button
					>
					<Share id={plan.id} />
				</div>
			</div>
			<div class="border rounded-4 py-2 px-3 mb-3">
				<p class="mb-2 text-center">Progres Keseluruhan</p>
				<div class="row mb-2">
					<div class="col-9 col-md-10">
						<div
							class="progress"
							role="progressbar"
							aria-label="Success striped example"
							aria-valuenow={totalProgress}
							aria-valuemin="0"
							aria-valuemax="6236"
						>
							<div
								class="progress-bar progress-bar-striped bg-success"
								style="width: {percenProgress}%"
							></div>
						</div>
					</div>
					<div class="col-3 col-md-2 text-center">
						<h6 class="fw-bolder">{Math.round(percenProgress)}%</h6>
					</div>
				</div>
				<hr />
				<div class="row">
					<div class="col-md-4">
						<p>Target Khatam <span class="fw-bold">{plan.targetKhatam}</span></p>
						<p>Inisiator <span class="fw-bold">{plan.inisiator}</span></p>
					</div>
					<div class="col-md-8 text-md-end list-btn mt-2 mt-md-0 mb-2 mb-md-0">
						<a href="/tadarus/{plan.id}/{member.memberId}" class="btn btn-sm btn-secondary"
							>Riwayat Tadarusku</a
						>
						<button class="btn btn-sm btn-secondary">Riwayat Anggota</button>
						{#if plan.inisiator === name}
							<button
								class="btn btn-sm btn-danger"
								data-bs-toggle="modal"
								data-bs-target="#deleteplan{plan.id}">Hapus</button
							>
						{/if}
					</div>
					<DeletePlan id={plan.id} />
				</div>

				{#if page}
					<div class="row px-2 pt-3">
						<a href="/quran/member/{tadarus[0].memberId}/{page}" class="btn btn-success"
							>Lanjut Tadarus</a
						>
						<div class="d-flex justify-content-evenly mt-1">
							<p>Juz {lastRead.juz}</p>
							<p>Surah {findSurah.surat_name}</p>
							<p>Ayat {lastRead.ayat}</p>
						</div>
					</div>
				{:else if tadarus[0].juz}
					<div class="row px-2 pt-3">
						<a
							href="/quran/member/{tadarus[0].memberId}/{juzPages[tadarus[0].juz - 1]}"
							class="btn btn-success">Mulai Tadarus</a
						>
					</div>
				{:else}{/if}
			</div>
			<div class="card juz py-2 px-5 rounded-4">
				<h6 class="text-center fw-bold mb-3">Daftar Pembagian</h6>
				<ul class="list-group list-group-flush">
					{#each generateJuzRanges(distributeJuz(plan.anggota)) as juz}
						{#if !juzs.includes(extractJuzNumbers(juz))}
							<li class="list-group-item d-flex justify-content-around align-items-center">
								<p>{juz}</p>
								<button
									class="btn btn-sm btn-success klaim"
									data-bs-toggle="modal"
									data-bs-target="#claim{juz.replace(/\s+/g, '')}"><span>Klaim</span></button
								>
							</li>
							<ClaimJuz id={member.memberId} {juz} />
						{:else}
							<li class="list-group-item d-flex justify-content-around align-items-center">
								<p>{juz}</p>
								<button class="btn btn-sm btn-secondary klaim" disabled><span>Klaim</span></button>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>
	{:else}
		<section>
			<div class="card p-3 rounded-4 text-center">
				<p class="mb-3">Anda telah diundang untuk bergabung</p>
				<form action="?/join" method="post">
					<input type="hidden" name="id" value={plan.id} />
					<input type="hidden" name="name" value={name} />
					<button type="submit" class="btn btn-sm btn-success">Bergabung</button>
				</form>
			</div>
		</section>
	{/if}
</section>

<style>
	p {
		margin: 0px;
		font-size: 0.8em;
	}
	input {
		font-size: 0.9em;
	}
	.list-btn button {
		font-size: 0.7em;
	}
	.juz {
		height: 40vh;
		overflow-y: auto;
	}
	.klaim {
		font-size: 0.5em;
	}
	.btn {
		border: none;
	}
</style>
