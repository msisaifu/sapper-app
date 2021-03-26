<script>
  import { sidebar_data } from '../stores/stores.js';
  import { goto } from '@sapper/app';
  import Modal from './Modal.svelte';
  import SortableList from './helpers/SortableList.svelte';
  let active_create_modal, tables = [], create_modal = true;

  const sortList = ev => {tables = ev.detail};

  sidebar_data.subscribe(value => {
		tables = value;
	});

  function handleCreateModal(){
    active_create_modal = true;
  }

  function handleCreateTable({detail: {table}}){
    table.id = tables.length + 1;
		tables = [...tables, table];
    sidebar_data.update(() => tables);
	}

  const navigate = async (id) => {
    await goto('/tables/' + id);
  }
</script>
<aside class="menu p-6 has-background-black">
  <h2 class="is-size-4 has-text-weight-bold  has-text-white">Table App</h2>
  <button class="button mt-4 is-info has-text-white" on:click={handleCreateModal}>
    <i class="fa fa-plus"></i>
    <span class="ml-2">Create a table</span>
  </button>
  <p class="menu-label mt-4 has-text-white">
    Tables
  </p>
  <SortableList
    list={tables}
    key="id"
    on:sort={sortList}
    let:item
  >
    <div class="has-text-white mt-3 has-cursor-pointer" on:click={() => navigate(item.id)}>
      <i class="fa fa-database"></i>
      <span class="ml-2">{item.name}</span>
    </div>
  </SortableList>
</aside>

<Modal bind:active={active_create_modal} on:createTable={handleCreateTable} {create_modal}/>

<style style="scss">
  .menu{
    height: 100vh;
  }
</style>