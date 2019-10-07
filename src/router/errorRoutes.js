import ErrorInternalServer from '../pages/error/ErrorInternalServer.vue';
import ErrorNotFound from '../pages/error/ErrorNotFound.vue';

const routes = [
  {
    path: '/oops',
    name: 'error_internal_server',
    component: ErrorInternalServer,
  },
  {
    path: '/*',
    name: 'error_not_found',
    component: ErrorNotFound,
  },
];
export default routes;
