<script>
	let password = '';
	let retype;
	let match;
	let passwordLength;

	$: {
		if (password === '') {
			match = 'is-invalid';
		} else if (password === retype && password.length >= 6) {
			match = 'is-valid';
		} else {
			match = 'is-invalid';
		}
	}
	$: {
		if (password.length >= 6) {
			passwordLength = 'is-valid';
		} else {
			passwordLength = 'is-invalid';
		}
	}
</script>

<section>
	<div class="card p-5 shadow">
		<h1 class="text-center fw-bolder mb-4">REGISTER</h1>
		<form method="post">
			<div class="form-floating mb-3">
				<input type="text" class="form-control" id="floatingInput" placeholder="Nama" name="name" />
				<label for="floatingInput">Nama</label>
			</div>
			<div class="form-floating mb-3">
				<input
					type="email"
					class="form-control"
					id="floatingInput"
					placeholder="name@example.com"
					name="email"
				/>
				<label for="floatingInput">Email</label>
			</div>
			<div class="form-floating mb-3">
				<input
					type="password"
					class="form-control {passwordLength}"
					id="floatingPassword"
					placeholder="Password"
					name="password"
					bind:value={password}
					required
				/>
				<label for="floatingPassword">Password</label>
				<div class="valid-feedback">Password diterima</div>
				<div class="invalid-feedback">Harus lebih dari 6 karakter</div>
			</div>
			<div class="form-floating mb-3">
				<input
					type="password"
					class="form-control {match}"
					id="floatingPassword"
					placeholder="Password"
					bind:value={retype}
				/>
				<label for="floatingPassword">Ketik Ulang Password</label>
				<div class="valid-feedback">Password sesuai</div>
				<div class="invalid-feedback">Password tidak sesuai</div>
			</div>
			<button
				type="submit"
				disabled={match === 'is-valid' ? false : true}
				class="btn btn-success w-100">Register</button
			>
		</form>
	</div>
</section>

<style>
	.card {
		border-radius: 10px 10px 50px 50px;
		border-bottom: solid 10px #6E6455 !important;
	}
</style>
