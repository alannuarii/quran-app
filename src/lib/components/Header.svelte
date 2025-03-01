<script>
	import logo from '../img/logo.png';
</script>

<nav class="navbar bg-body-tertiary px-md-4 px-2 border">
	<div class="container-fluid">
		<a class="navbar-brand fw-bolder" href="/">
			<img src={logo} alt="Logo" width="30" height="30" class="d-inline-block align-text-top" />
			QURAN
		</a>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="btn" data-bs-toggle="modal" data-bs-target="#profile"
			><i class="bi-person-circle"></i></button
		>
	</div>
</nav>

<style>
	.navbar {
		border-radius: 0 0 30px 30px;
		border-bottom: solid 8px #6E6455 !important;
	}
	button {
		border: none;
	}
	i {
		font-size: 1.3em;
	}
</style>
