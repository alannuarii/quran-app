<script>
	import { onMount } from 'svelte';

	let waktu;

	function updateWaktu() {
		const hariIndonesia = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
		const bulanIndonesia = [
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember'
		];

		const now = new Date();
		const hari = hariIndonesia[now.getDay()];
		const tanggal = now.getDate();
		const bulan = bulanIndonesia[now.getMonth()];
		const tahun = now.getFullYear();
		const jam = String(now.getHours()).padStart(2, '0');
		const menit = String(now.getMinutes()).padStart(2, '0');
		const detik = String(now.getSeconds()).padStart(2, '0');

		waktu = `${hari}, ${tanggal} ${bulan} ${tahun} ${jam}:${menit}:${detik}`;
	}

	onMount(() => {
		updateWaktu();
		const interval = setInterval(updateWaktu, 1000);

		return () => clearInterval(interval);
	});
</script>

<p>{waktu}</p>

<style>
	p {
		margin: 0px;
		font-size: 0.8rem;
	}
</style>
