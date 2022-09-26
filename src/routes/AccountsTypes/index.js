import AccountsTypesController from '../../app/controllers/AccountsTypesController';

export default (routes, auth) => {
  routes.get(
    '/accounts/types/get/all',
    auth,
    AccountsTypesController.getAllTypes
  );
};
