<script>
	export let value, label, type;
	function typeAction(node) {
		node.type = type;
    if(type == 'number')
      node.step = "0.01"
	}
</script>

<input class="input" placeholder={label} use:typeAction bind:value>