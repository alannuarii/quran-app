<script>
	import { transformJuzRange } from '../../utils/helper';

	export let progressMembers;

	const progress = transformJuzRange(progressMembers);
</script>

<div
	class="modal fade"
	id="progress"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Progress Anggota</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body text-start">
				<ol class="list-group list-group-numbered">
					{#each progress as pr}
						<li class="list-group-item d-flex justify-content-between align-items-start">
							<div class="ms-2 me-auto">
								<div class="fw-bold">{pr.name}</div>
								{pr.juz}
							</div>
							<span class="badge text-bg-success rounded-pill"
								>{Math.round((pr.totalAmount / pr.totalAyat) * 100)} %</span
							>
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</div>
