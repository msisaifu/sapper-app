import { writable } from 'svelte/store';

export const sidebar_data = writable([
  {
    id: 1,
    name: "Product",
    fields: [
      {name: 'Name', type: 'text', id: 1},
      {name: 'Number', type: 'number', id: 2},
      {name: 'Discount', type: 'checkbox', id: 3},
      {name: 'Date', type: 'date', id: 4},
      {name: '2|Categories', type: 'reference_to', id: 5},
    ]
  },
  {
    id: 2,
    name: "Categories",
    fields: [
      { name: 'Name', type: 'text', id: 1 },
    ]
  }
]);