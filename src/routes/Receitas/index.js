import ReceitasController from '../../app/controllers/ReceitasController';

export default (routes, auth) => {
  routes.get('/receitas/get/all', ReceitasController.getAllReceitas);
  routes.post('/receitas/create', ReceitasController.createReceita);
};
