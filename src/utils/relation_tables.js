import { sidebar_data } from '../stores/stores.js';

export const rel_tbl = {
  name(field) {
    let _arr = field.split('|');
    return _arr[1];
  },
  id(field) {
    let _arr = field.split('|');
    return _arr[0];
  },
  rows(data, field) {
    let _arr = field.split('|'),
      _id = _arr[0],
      _table = data.find((e) => e.id == _id);
    return _table.records || [];
  },
  add_new(data, field){
    let _arr = field.split('|'),
      _id = _arr[0],
      _table = data.find((e) => e.id == _id),
      _index = data.findIndex((e) => e.id == _id),
      _data = _table.records || [],
      _new_data = {};
      _new_data.id = _data.length + 1;
    _data = [..._data, _new_data];
    _table['records'] = _data;
    data[_index] = _table;
    sidebar_data.update(() => data);
    return _new_data.id;
  }
};