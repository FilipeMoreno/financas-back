import DashboardController from '../../app/controllers/DashboardController';

export default (routes, auth) => {
  routes.get('/dashboard/get', DashboardController.getDashboardIndex);
};
