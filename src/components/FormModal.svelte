<script>
  import Input from './helpers/Input.svelte';
  import { createEventDispatcher } from 'svelte';
  export let active = false, fields = [],
      form_data = {};

  let is_loading = false;

  const dispatch = createEventDispatcher();

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
          {#each fields as {name, type}}
            {#if type == 'checkbox'}
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox" bind:checked={form_data[name]}>
                  {name}
                </label>
              </div>
            {:else}
              <Input type={type} label={name} bind:value={form_data[name]}/>
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