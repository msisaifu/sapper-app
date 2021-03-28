<script>
  import { rel_tbl }  from '../../utils/relation_tables.js';
  import { createEventDispatcher } from 'svelte';
  export let record, fields;

  const dispatch = createEventDispatcher();

  function handleEditFormModal(record){
    dispatch('handleEditFormModal', {
      record
    });
  }
</script>

<tr>
  <td>#{record['id']}</td>
  {#each fields as {type, id, name}}
    <td>
      {#if type == 'reference_to'}
        {#if record[id]}
          <a href="/tables/{rel_tbl.id(name)}?id={record[id]}">#{record[id]}</a>
        {:else}
          null
        {/if}
      {:else}
        { type == 'checkbox' ? record[id] ? 1 : 0 : record[id] || null}
      {/if}
    </td>
  {/each}
  <td>
    <span class="has-text-light has-cursor-pointer" on:click={() => handleEditFormModal(record)}>
      <i class="fa fa-edit"></i>
    </span>
  </td>
</tr>