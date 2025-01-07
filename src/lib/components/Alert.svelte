<script>
	export let message = 'Operation successful'; // Pesan default untuk alert
	export let progressDuration = 3000; // Durasi progress bar dalam milidetik
	export let onComplete = () => {}; // Callback saat progress selesai

	let progressWidth = 0; // Lebar progress bar
	let progressInterval;

	const startProgress = () => {
		const progressStep = 100; // Interval pembaruan animasi dalam milidetik
		const stepWidth = 100 / (progressDuration / progressStep); // Hitung lebar per langkah

		progressWidth = 0; // Reset progress bar
		progressInterval = setInterval(() => {
			if (progressWidth >= 100) {
				clearInterval(progressInterval);
				onComplete(); // Panggil callback saat selesai
			} else {
				progressWidth += stepWidth;
			}
		}, progressStep);
	};

	// Mulai progress saat komponen di-mount
	startProgress();
</script>

<div class="alert alert-success text-center" role="alert">
	<p>{message}</p>
	<div
		class="progress mt-2 mx-3"
		role="progressbar"
		aria-valuenow={progressWidth}
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div class="progress-bar bg-secondary" style="width: {Math.min(progressWidth, 100)}%"></div>
	</div>
</div>

<style>
	p {
		margin: 0px;
		font-size: 0.8em;
	}
	.progress {
		height: 5px;
	}
</style>
