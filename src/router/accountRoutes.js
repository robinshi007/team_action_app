import LayoutEmpty from '../layouts/LayoutEmpty.vue';
import Login from '../pages/account/Login.vue';
import ChangePassword from '../pages/account/ChangePassword.vue';
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
      {
        path: '/account/change_password',
        name: 'account.change_password',
        component: ChangePassword,
        meta: {
          requiresAuth: true,
        },
      },
      ...errorRoutes,
    ],
  },
];
export default routes;
