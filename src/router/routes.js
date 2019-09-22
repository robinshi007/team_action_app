import DefaultLayout from '../layouts/Default.vue';
import Home from '../pages/Home.vue';
import SearchResult from '../pages/SearchResult.vue';

import noteRoutes from './noteRoutes';
import loginRoutes from './loginRoutes';

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
        path: '/search',
        name: 'search_result',
        component: SearchResult,
      },
      ...noteRoutes,
    ],
  },
  ...loginRoutes,
];

export default routes;
