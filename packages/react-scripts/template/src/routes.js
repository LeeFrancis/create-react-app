import helloWorldRoutes from './micro-uis/helloworld/routes';
import HomePage from './components/Home';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage, // Add your route here
    loadData: () => {},
  },
  // {
  //   path: '*',
  //   component: NotFoundPage
  // }
].concat(
  helloWorldRoutes.map(route => Object.assign({ team: 'DaVincis' }, route))
);
