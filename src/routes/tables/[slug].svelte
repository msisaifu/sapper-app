<script context="module">
	export async function preload(page, session) {
    const pre_data = {};
		pre_data.slug = page.params;
    pre_data.query = page.query;

		return { pre_data };
	}
</script>

<script>
  import { sidebar_data } from '../../stores/stores.js';
  import { rel_tbl }  from '../../utils/relation_tables.js';
  import Modal from '../../components/Modal.svelte';
  import FormModal from '../../components/FormModal.svelte';
  import Row from '../../components/helpers/Row.svelte';
  export let pre_data;
  let data, active_create_modal, _fields, active_form_modal, form_data;

  sidebar_data.subscribe(value => {
		data = value;
	});

  $: slug = pre_data && pre_data.slug.slug;
  $: query = pre_data && pre_data.query.id;
  $: table = slug && data && data.find(e => e.id == slug);
  $: records = table.records || [];
  $: form_fields = table && table.fields;
  $: _index = data && data.findIndex(e => e.id == slug);
  $: recordByQuery = table && table.records && table.records.find(e => e.id == query);
  function handleCreateModal(){
    active_create_modal = true;
  }
  function handleFormModal(){
    active_form_modal = true;
    form_data = {};
  }

  function handleEditFormModal({detail: {record}}){
    active_form_modal = true;
    form_data = record;
  }

  function handleUpdateTable({detail: {table}}){
    let fields = table.fields;
    _fields = fields.filter((e) => e.name != '');
    table['fields'] = _fields;
    data[_index] = table;
    sidebar_data.update(() => data);
	}

  function handleCreateRecord({detail: {form_data}}){
    let _data = table.records || [];
    if(!form_data.id){
      form_data.id = _data.length + 1;
      _data = [..._data, form_data];
    } else {
      let index = _data.findIndex(e => e.id == form_data.id);
      _data[index] = form_data;
    }
    table['records'] = _data;
    data[_index] = table;
    sidebar_data.update(() => data);
	}

</script>

<svelte:head>
	<title>Tables - {table.name} </title>
</svelte:head>

<div class="mt-6">
  <h2 class="is-size-5 has-text-weight-bold  has-text-light">{table.name}</h2>
  <div class="p-3">
    <div class="level">
      <div class="level-left">
        <div class="level-item ">
          <p class="is-size-3 has-text-light ">{table.name}</p>
        </div>
        <div class="level-item ml-4">
          {#if table.fields.length}
            <button class="button is-white" on:click={handleFormModal}>
              <i class="fa fa-plus"></i>
              <span class="ml-2">Add a new record</span>
            </button>
          {/if}
        </div>
        <div class="level-item ml-4">
          <button class="button is-white" on:click={handleCreateModal}>
            <i class="fa fa-edit"></i>
            <span class="ml-2">Edit columns</span>
          </button>
        </div>
      </div>
    </div>
    <div class="table-container pb-6" style="height:80vh; overflow:auto;">
      {#if table.fields.length}
        <!-- svelte-ignore component-name-lowercase -->
        <table class="table is-fullwidth has-background-dark has-text-light">
          <thead>
            <tr>
              <th  class="has-text-light">ID</th>
              {#each table.fields as {name, type}}
                {#if type == 'reference_to'}
                  <th class="has-text-light">{rel_tbl.name(name)}</th>
                {:else}
                  <th class="has-text-light">{name}</th>
                {/if}
              {/each}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#if recordByQuery}
              <Row record={recordByQuery} fields={table.fields} on:handleEditFormModal={handleEditFormModal}/>
            {:else}
                {#each records as record}
                  {#if !record.hidden}
                    <Row {record} fields={table.fields} on:handleEditFormModal={handleEditFormModal}/>
                  {/if}
                {/each}
            {/if}
          </tbody>
        </table>
      {/if}
    </div>
  </div>
</div>

<Modal bind:active={active_create_modal} {table} on:updateTable={handleUpdateTable}/>
{#if active_form_modal}
  <FormModal bind:active={active_form_modal} fields={form_fields} {form_data} on:save={handleCreateRecord}/>
{/if}