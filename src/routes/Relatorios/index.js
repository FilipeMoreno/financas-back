import RelatoriosController from '../../app/controllers/RelatoriosController';

export default (routes) => {
  routes.get(
    '/relatorios/despesas/7dias',
    RelatoriosController.getDespesas7Dias
  );
  routes.get(
    '/relatorios/receitas/7dias',
    RelatoriosController.getReceitas7Dias
  );
  routes.get(
    '/relatorios/receitas/categorias',
    RelatoriosController.getReceitasCategorias
  );
  routes.get(
    '/relatorios/despesas/categorias',
    RelatoriosController.getDespesasCategorias
  );
  routes.get(
    '/relatorios/transacoes/7dias',
    RelatoriosController.getTransactions7dias
  );
  routes.get(
    '/relatorios/transacoes/receitasxdespesas',
    RelatoriosController.getReceitasXDespesas
  );
};
