<script>
  import { sidebar_data } from '../stores/stores.js';
  import { rel_tbl }  from '../utils/relation_tables.js';
  import Input from './helpers/Input.svelte';
  import { createEventDispatcher } from 'svelte';
  export let active = false, fields = [],
      form_data = {};

  let is_loading = false, tables = [];

  const dispatch = createEventDispatcher();

  sidebar_data.subscribe(value => {
		tables = value;
	});

  function handleCloseModal(){
    active = false;
  }

  function submitHandler(){
    is_loading = true;

    setTimeout(() => {
      dispatch('save', {
        form_data
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
      <p class="modal-card-title">Add a new record</p>
      <button class="delete" aria-label="close" on:click={handleCloseModal}></button>
    </header>
    <section class="modal-card-body">
        <form on:submit|preventDefault={submitHandler}>
          {#each fields as {name, type, id}}
            {#if type == 'checkbox'}
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox" bind:checked={form_data[id]}>
                  {name}
                </label>
              </div>
            {:else if type == 'reference_to'}
              <div class="field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                  {rel_tbl.name(name)}
                </label>
                <div class="control">
                  <span class="select">
                    <!-- svelte-ignore a11y-no-onchange -->
                    <select bind:value={form_data[id]}>
                      <option value="">Select a record</option>
                      {#each rel_tbl.rows(tables, name) as {id}}
                        <option value={id}>{id}</option>
                      {/each}
                    </select>
                  </span>
                </div>
              </div>
            {:else}
              <div class="field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">{name}</label>
                <div class="control">
                  <Input type={type} label={name} bind:value={form_data[id]}/>
                </div>
              </div>
            {/if}
          {/each}
          <div class="buttons">
            <button class="button is-info {is_loading ? 'is-loading is-disabled' : ''}">Save</button>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" bind:checked={form_data.hidden}>
                Hidden
              </label>
            </div>
          </div>
        </form>
    </section>
  </div>
</div>