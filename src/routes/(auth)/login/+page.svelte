<section>
	<div class="card p-5 shadow">
		<h1 class="text-center fw-bolder mb-4">LOGIN</h1>
		<form method="post">
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
					class="form-control"
					id="floatingPassword"
					placeholder="Password"
					name="password"
				/>
				<label for="floatingPassword">Password</label>
			</div>
			<button type="submit" class="btn btn-success w-100">Login</button>
		</form>
		<hr />
		<div>
			<p class="text-center mb-2">Login dengan akun Google</p>
			<a href="/api/auth/login" class="btn btn-secondary w-100"
				><i class="bi-google me-2"></i> Google</a
			>
		</div>
		<hr />
		<div>
			<p class="text-center mb-2">Jika belum memiliki akun, segera daftar!</p>
			<a href="/register" class="btn btn-primary w-100">Register</a>
		</div>
	</div>
</section>

<style>
	.card {
		border-radius: 10px 10px 50px 50px;
		border-bottom: solid 10px #2a9d8f !important;
	}
	p {
		margin: 0px;
		font-size: 0.8em;
	}
</style>
