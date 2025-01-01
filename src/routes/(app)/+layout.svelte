<script>
	import Bottom from '$lib/components/Bottom.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>Jariah App</title>
	<meta name="description" content="Project5" />
</svelte:head>

<main>
	<div class="row">
		<div class="offset-md-3 col-md-6">
			<div class="position-relative">
				<div class="header position-absolute top-0 start-50 translate-middle-x">
					<Header />
				</div>
			</div>
			<div class="content px-4">
				<slot />
			</div>
			<Bottom />
		</div>
	</div>
</main>

<style>
	main {
		background-image: url('../../lib/img/bg.jpg');
		background-size: cover;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.header {
		width: 100%;
	}
	.content {
		padding-top: 80px;
	}
</style>
