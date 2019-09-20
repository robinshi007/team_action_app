import DefaultLayout from '../layouts/Default.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ProductList from '../views/note/ProductList.vue';
import ProductDetail from '../views/note/ProductDetail.vue';
import ProductNew from '../views/note/ProductNew.vue';
import ProductEdit from '../views/note/ProductEdit.vue';
import NoteList from '../views/note/NoteList.vue';
import NoteDetail from '../views/note/NoteDetail.vue';
import NoteNew from '../views/note/NoteNew.vue';
import NoteEdit from '../views/note/NoteEdit.vue';
import NotFound from '../views/NotFound.vue';
import SearchResult from '../views/Search.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/search',
        name: 'search_result',
        component: SearchResult,
      },
      {
        path: '/product',
        name: 'product_list',
        component: ProductList,
      },
      {
        path: '/product_new',
        name: 'product_new',
        component: ProductNew,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/product/:id',
        name: 'product_detail',
        component: ProductDetail,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/product/:id/edit',
        name: 'product_edit',
        component: ProductEdit,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/note',
        name: 'note_list',
        component: NoteList,
      },
      {
        path: '/note/:id',
        name: 'note_detail',
        component: NoteDetail,
      },
      {
        path: '/note/:id/edit',
        name: 'note_edit',
        component: NoteEdit,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/note_new',
        name: 'note_new',
        component: NoteNew,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/*',
        name: 'not_found',
        component: NotFound,
      },
    ],
  },
];

export default routes;
