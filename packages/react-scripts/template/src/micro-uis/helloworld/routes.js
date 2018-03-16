import HomePage from './components/Home';

export default [
  {
    path: '/hello',
    exact: true,
    component: HomePage, // Add your route here
    loadData: () => {},
  },
];
