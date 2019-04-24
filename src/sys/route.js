import ErrorRoute from './error/route';

export default [{
  // 首页
  path: '/',
  component: () => import('./index'),
  exact: true,
}, {
  path: '/stock',
  component: () => import('./stock'),
}, {
  path: '/error',
  routes: ErrorRoute,
}];
