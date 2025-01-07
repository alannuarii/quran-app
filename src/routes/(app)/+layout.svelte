<script>
	import Bottom from '$lib/components/Bottom.svelte';
	import Header from '$lib/components/Header.svelte';
	import Profile from '$lib/components/modals/Profile.svelte';

	export let data;

	const user = data?.user;
</script>

<svelte:head>
	<title>Jariyah App</title>
	<meta name="description" content="Project7" />
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
				<slot {user} />
			</div>
			<Bottom />
		</div>
	</div>
	<Profile {user} />
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
		padding-bottom: 90px;
	}
</style>
