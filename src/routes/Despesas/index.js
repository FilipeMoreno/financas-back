import DespesasController from '../../app/controllers/DespesasController';

export default (routes, auth) => {
  routes.get('/despesas/get/all', DespesasController.getAllDespesas);
  routes.post('/despesas/create', DespesasController.createDespesa);
};
