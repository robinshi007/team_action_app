import DefaultLayout from '../layouts/Default.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Product from '../views/note/Product.vue';
import NoteList from '../views/note/NoteList.vue';
import NoteDetail from '../views/note/NoteDetail.vue';
import NoteNew from '../views/note/NoteNew.vue';
import NoteEdit from '../views/note/NoteEdit.vue';
import NotFound from '../views/NotFound.vue';

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
        path: '/product',
        name: 'product',
        component: Product,
      },
      {
        path: '/note',
        name: 'note',
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
