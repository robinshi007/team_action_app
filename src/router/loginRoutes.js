import LayoutEmpty from '../layouts/LayoutEmpty.vue';
import Login from '../pages/Login.vue';
import errorRoutes from './errorRoutes';

const routes = [
  {
    path: '/',
    component: LayoutEmpty,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      ...errorRoutes,
    ],
  },
];
export default routes;
