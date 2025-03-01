<svelte:head>
	<title>QURAN</title>
	<meta name="QURAN" content="QURAN" />
</svelte:head>

<main class="container-fluid d-flex justify-content-center align-items-center">
	<slot />
</main>

<style>
	main {
		background-image: url('../../lib/img/bg.jpg');
		background-size: cover;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
