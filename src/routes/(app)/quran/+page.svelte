<script>
	let jumlahJuz = Array.from({ length: 30 }, (_, i) => i + 1);
</script>

<section>
	<div class="card p-3 rounded-4">
		<div>
			<!-- Nav tabs -->
			<ul class="nav nav-underline d-flex justify-content-evenly" id="myTab" role="tablist">
				<li class="nav-item" role="presentation">
					<button
						class="nav-link active"
						id="juz-tab"
						data-bs-toggle="tab"
						data-bs-target="#juz"
						type="button"
						role="tab"
						aria-controls="juz"
						aria-selected="true"
					>
						Juz
					</button>
				</li>
				<li class="nav-item" role="presentation">
					<button
						class="nav-link"
						id="surah-tab"
						data-bs-toggle="tab"
						data-bs-target="#surah"
						type="button"
						role="tab"
						aria-controls="surah"
						aria-selected="false"
					>
						Surah
					</button>
				</li>
			</ul>
			<hr />
			<!-- Tab content -->
			<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade show active" id="juz" role="tabpanel" aria-labelledby="juz-tab">
					<div class="list-group">
						{#each jumlahJuz as juz}
							<a href="/" class="list-group-item list-group-item-action">Juz {juz}</a>
						{/each}
					</div>
				</div>
				<div class="tab-pane fade" id="surah" role="tabpanel" aria-labelledby="surah-tab">
					<ol class="list-group list-group-numbered">
						<li class="list-group-item d-flex justify-content-between align-items-start">
							<div class="ms-2 me-auto">
								<div class="fw-bold">Subheading</div>
								Content for list item
							</div>
							<span class="badge text-bg-primary rounded-pill">14</span>
						</li>
						<li class="list-group-item d-flex justify-content-between align-items-start">
							<div class="ms-2 me-auto">
								<div class="fw-bold">Subheading</div>
								Content for list item
							</div>
							<span class="badge text-bg-primary rounded-pill">14</span>
						</li>
						<li class="list-group-item d-flex justify-content-between align-items-start">
							<div class="ms-2 me-auto">
								<div class="fw-bold">Subheading</div>
								Content for list item
							</div>
							<span class="badge text-bg-primary rounded-pill">14</span>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</section>
