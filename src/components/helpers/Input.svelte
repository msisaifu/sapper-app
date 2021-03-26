<script>
	export let value, label, type;
	function typeAction(node) {
		node.type = type;
    if(type == 'number')
      node.step = "0.01"
	}
</script>

<div class="field">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">{label}</label>
  <div class="control">
    <input class="input" placeholder={label} use:typeAction bind:value>
  </div>
</div>