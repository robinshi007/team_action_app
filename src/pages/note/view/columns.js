import { parseISO } from 'date-fns';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.title,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'category',
    label: 'Product',
    field: row => row.category && row.category.name,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'updated_at',
    label: 'Updated At',
    field: row => row.updated_at,
    format: val => `${val}`,
    sortable: true,
    sort: (a, b) => parseISO(a) - parseISO(b),
  },
  {
    name: 'updated_by',
    label: 'Updated By',
    field: row => row,
    format: val => `${val}`,
    sortable: true,
  },
];
export default columns;
