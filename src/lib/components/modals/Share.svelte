<script>
	import Alert from '../Alert.svelte';

	export let id;

	let buttonClass = 'btn-success';
	let buttonDisabled = false;
	let showAlert = false;

	const message = 'Selamat bergabung';

	const copyToClipboard = () => {
		navigator.clipboard.writeText(message).then(() => {
			showAlert = true;
			buttonClass = 'btn-secondary';
			buttonDisabled = true;
		});
	};

	// Fungsi untuk menangani selesai progress
	const handleAlertComplete = () => {
		showAlert = false; // Sembunyikan alert setelah selesai
	};

	// Fungsi untuk membuka WhatsApp dengan pesan
	const shareToWhatsApp = () => {
		const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
		window.open(whatsappURL, '_blank'); // Membuka URL di tab baru
	};
</script>

<div
	class="modal fade"
	id="id{id}"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content rounded-4">
			<div class="modal-body">
				{#if showAlert}
					<Alert
						message="Link berhasil disalin"
						progressDuration={3000}
						onComplete={handleAlertComplete}
					/>
				{/if}

				<div class="row g-2 align-items-center">
					<div class="col-10">
						<input
							type="text"
							class="form-control"
							placeholder="First name"
							aria-label="First name"
							value={id}
							readonly
						/>
					</div>
					<div class="col-2">
						<button
							class="btn btn-sm {buttonClass} w-100"
							on:click={copyToClipboard}
							disabled={buttonDisabled}
						>
							Salin
						</button>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<p>Bagikan link berikut via</p>
				<!-- Tombol WhatsApp -->
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="btn btn-light border" on:click={() => shareToWhatsApp()}>
					<i class="bi-whatsapp"></i>
				</button>
				<!-- Tombol Google -->
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="btn btn-light border"><i class="bi-google"></i></button>
			</div>
		</div>
	</div>
</div>

<style>
	.modal-footer p {
		font-size: 0.9em;
	}
</style>
