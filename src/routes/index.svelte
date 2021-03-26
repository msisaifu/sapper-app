<script>
import { sidebar_data } from '../stores/stores.js';
  let data;

  const unsubscribe = sidebar_data.subscribe(value => {
		data = value;
	});

</script>
<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="mt-6" style="height:80vh; overflow:auto;">
  <h2 class="is-size-5 has-text-weight-bold  has-text-light">Dashboard</h2>
</div>