import OrcamentosController from '../../app/controllers/OrcamentosController';

export default (routes) => {
  routes.get('/orcamentos/get/all', OrcamentosController.getAllOrcamentos);

  routes.get(
    '/orcamentos/detalhes/:id',
    OrcamentosController.getDetalhesOrcamentos
  );

  routes.post('/orcamentos/novo', OrcamentosController.createOrcamento);
};
