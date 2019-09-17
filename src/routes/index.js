import DefaultLayout from '../layouts/Default.vue';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Note from '../views/Note.vue';
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
        path: '/product',
        name: 'product',
        component: Product,
      },
      {
        path: '/note',
        name: 'note',
        component: Note,
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
