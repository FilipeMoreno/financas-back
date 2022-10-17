import Accounts from '../../app/controllers/AccountsController';

export default (routes, auth) => {
  routes.get('/accounts/get/all', Accounts.getAccounts);

  routes.post('/accounts/create', Accounts.createAccount);
};
