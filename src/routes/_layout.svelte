<script>
	import Sidebar from '../components/Sidebar.svelte';
</script>

<style lang="scss" global>
 	@import "../scss/app.scss";
	.custom-height{
		height: 100vh;
	}
</style>

<main class="has-background-white">
	<div class="container">
		<div class="columns custom-height">
			<div class="column is-narrow p-0">
				<Sidebar/>
			</div>
			<div class="column has-background-dark">
				<slot></slot>
			</div>
		</div>
	</div>
</main>