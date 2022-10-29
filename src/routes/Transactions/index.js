import TransactionsController from '../../app/controllers/TransactionsController';

export default (routes) => {
  routes.get('/transacoes/get/all', TransactionsController.getAllTransactions);
};
