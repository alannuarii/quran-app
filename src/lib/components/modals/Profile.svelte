<script>
	export let user;
</script>

<div
	class="modal fade"
	id="profile"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content rounded-4">
			<div class="modal-header mx-3">
				<h5 class="modal-title fw-bold" id="exampleModalLabel">Profile</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="text-center">
					<i class="bi-person-circle"></i>
				</div>
				<div class="form-floating mb-3">
					<input
						type="text"
						readonly
						class="form-control-plaintext fw-bold"
						id="floatingPlaintextInput"
						value={user?.name}
					/>
					<label for="floatingPlaintextInput">Nama</label>
				</div>
				<div class="form-floating mb-3">
					<input
						type="text"
						readonly
						class="form-control-plaintext fw-bold"
						id="floatingPlaintextInput"
						value={user?.email}
					/>
					<label for="floatingPlaintextInput">Email</label>
				</div>
				<div class="text-center">
					<button
						class="btn btn-sm btn-secondary"
						data-bs-toggle="collapse"
						data-bs-target="#logout"
						aria-expanded="false"
						aria-controls="logout"><i class="bi-box-arrow-right me-2"></i>Logout</button
					>
					<div class="collapse" id="logout">
						<div class="card card-body mt-3 text-center">
							<p>Apakah Anda yakin ingin logout?</p>
							<div class="d-flex justify-content-center align-items-center">
								<a href="/logout" class="btn btn-sm btn-danger w-25">Ya!</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.bi-person-circle {
		font-size: 5em;
	}
	#logout p {
		font-size: 0.8em;
	}
</style>
