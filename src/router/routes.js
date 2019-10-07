import DefaultLayout from '../layouts/Default.vue';
import Home from '../pages/Home.vue';
import SearchResult from '../pages/SearchResult.vue';

import accountRoutes from './accountRoutes';
import noteRoutes from './noteRoutes';

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
  ...accountRoutes,
];

export default routes;
