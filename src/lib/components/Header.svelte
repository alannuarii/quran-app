<!-- <script>
	import Profile from './modals/Profile.svelte';
</script> -->

<nav class="navbar bg-body-tertiary px-md-4 px-2 border">
	<div class="container-fluid">
		<a class="navbar-brand fw-bolder" href="/">
			<!-- <img
				src="/docs/5.3/assets/brand/bootstrap-logo.svg"
				alt="Logo"
				width="30"
				height="24"
				class="d-inline-block align-text-top"
			/> -->
			QURAN App
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
		border-bottom: solid 8px #2a9d8f !important;
	}
	button {
		border: none;
	}
	i {
		font-size: 1.3em;
	}
</style>
