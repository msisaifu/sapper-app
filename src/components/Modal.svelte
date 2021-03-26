<script>
  import { createEventDispatcher } from 'svelte';
  export let active = false, create_modal = false;
  export let table = {
    name: '',
    fields:[]
  },
  types = [
    'text',
    'color',
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'time',
    'url',
    'week',
    'checkbox',
  ];

  let is_loading = false;

  const dispatch = createEventDispatcher();

  $: disabled = (table.name == '')

  function handleCloseModal(){
    active = false;
  }

  function handleCreateTable(){
    is_loading = true;
    setTimeout(() => {
      dispatch('createTable', {
        table
      });
      table = {
        name: '',
        fields:[]
      };
      is_loading = false;
      setTimeout(() => {
        handleCloseModal();
      }, 200)
    }, 500);
  }

  function handleTableFields(){
    let field = {type: '', name: ''},
      fields = [...table.fields, field];
    table['fields'] = fields;
  }

  function handleRemoveItem(index){
    let fields = table.fields;
    fields.splice(index, 1);
    table['fields'] = fields;
  }

  function handleUpdateTable(){
    is_loading = true;
    setTimeout(() => {
      dispatch('updateTable', {
			  table
		  });
      is_loading = false;
      setTimeout(() => {
        handleCloseModal();
      }, 200)
    }, 500);
  }
</script>

<div class="modal {active ? 'is-active' : ''}">
  <div class="modal-background"></div>
  <div class="modal-card" style="width:60rem">
    <header class="modal-card-head">
      <p class="modal-card-title">Create new table</p>
      <button class="delete" aria-label="close" on:click={handleCloseModal}></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Table Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Table name" bind:value={table.name}>
        </div>
      </div>

      {#each table.fields as field, i}
        <div class="field has-addons">
          <p class="control">
            <span class="select">
              <select bind:value={table.fields[i].type}>
                <option value="">Select type</option>
                {#each types as type}
                  <option value={type}>{type}</option>
                {/each}
              </select>
            </span>
          </p>
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="field name" bind:value={table.fields[i].name}>
          </p>
          {#if table.fields[i].type == 'checkbox'}
            <p class="control">
              <input class="input" type="text" placeholder="For true" bind:value={table.fields[i].checked}>
            </p>
            <p class="control">
              <input class="input" type="text" placeholder="For false" bind:value={table.fields[i].unchecked}>
            </p>
          {/if}
          <p class="control">
            <button class="button is-danger" on:click={() => {handleRemoveItem(i)}}><i class="fa fa-trash"></i></button>
          </p>
        </div>
      {/each}
    </section>
    <footer class="modal-card-foot">
      {#if create_modal}
        <button class="button is-success {is_loading ? 'is-loading is-disabled' : ''}" {disabled} on:click={handleCreateTable}>Create</button>
      {:else}
        <button class="button is-success {is_loading ? 'is-loading is-disabled' : ''}" {disabled} on:click={handleUpdateTable}>Update</button>
      {/if}
      <button class="button is-link" on:click={handleTableFields}>
        <i class="fa fa-plus"></i>
        <span class="ml-2">
          Add a new field
        </span>
      </button>
    </footer>
  </div>
</div>