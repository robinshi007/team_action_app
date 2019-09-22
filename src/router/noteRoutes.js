import EmptyView from '../pages/EmptyView.vue';
import NoteSidebar from '../pages/note/NoteSidebar.vue';
import ProductList from '../pages/note/ProductList.vue';
import ProductDetail from '../pages/note/ProductDetail.vue';
import ProductNew from '../pages/note/ProductNew.vue';
import ProductEdit from '../pages/note/ProductEdit.vue';
import NoteList from '../pages/note/NoteList.vue';
import NoteDetail from '../pages/note/NoteDetail.vue';
import NoteNew from '../pages/note/NoteNew.vue';
import NoteEdit from '../pages/note/NoteEdit.vue';

const noteRoutes = [
  {
    path: '/noteapp',
    components: {
      default: EmptyView,
      sidebar: NoteSidebar,
    },
    children: [
      {
        path: '',
        name: 'note.home',
        component: NoteList,
      },
      {
        path: 'noteapp/product',
        name: 'note.product_list',
        component: ProductList,
      },
      {
        path: 'product_new',
        name: 'note.product_new',
        component: ProductNew,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'product/:id',
        name: 'note.product_detail',
        component: ProductDetail,
      },
      {
        path: 'product/:id/edit',
        name: 'note.product_edit',
        component: ProductEdit,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'note',
        name: 'note.note_list',
        component: NoteList,
      },
      {
        path: 'note/:id',
        name: 'note.note_detail',
        component: NoteDetail,
      },
      {
        path: 'note/:id/edit',
        name: 'note.note_edit',
        component: NoteEdit,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'note_new',
        name: 'note.note_new',
        component: NoteNew,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default noteRoutes;
