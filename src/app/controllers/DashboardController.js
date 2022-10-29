import { Op } from 'sequelize';

import Accounts from '../models/Accounts';
import AccountsTypes from '../models/AccountsTypes';
import Banks from '../models/Banks';
import Categories from '../models/Categories';
import Transactions from '../models/Transactions';

class DashboardController {
  async getDashboardIndex(req, res) {
    try {
      let saldoConta = 0;
      let saldoPrevisto = 0;

      let despesasTotais = 0;
      let total_despesas_pendentes = 0;

      let receitasTotais = 0;
      let total_receita_pendentes = 0;

      let totalMovimentacao = 0;

      let qtdReceitas = 0;
      let qtdDespesas = 0;

      let totalDespesas = 0;
      let totalReceitas = 0;

      let receitasMaisDespesas = 0;

      const accounts = await Accounts.findAll({
        include: [
          {
            model: Banks,
            as: 'bank',
            attributes: ['name', 'color', 'icon_url'],
          },
          {
            model: AccountsTypes,
            as: 'type',
            attributes: ['name', 'icon_url'],
          },
        ],
        order: [['name', 'ASC']],
      });

      accounts.map((account) => {
        saldoConta += account.balance;
      });

      const despesasPendentes = await Transactions.findAll({
        where: { efetivada: false, tipo: 'DESPESA' },
        include: [
          {
            model: Categories,
            as: 'categoria',
            attributes: ['name', 'color', 'icon_url'],
          },
        ],
        order: [['createdAt', 'desc']],
      });

      const receitasPendentes = await Transactions.findAll({
        where: { efetivada: false, tipo: 'RECEITA' },
        include: [
          {
            model: Categories,
            as: 'categoria',
            attributes: ['name', 'color', 'icon_url'],
          },
        ],
        order: [['createdAt', 'desc']],
      });

      despesasPendentes.map((despesa) => {
        despesasTotais += despesa.valor;
        total_despesas_pendentes += 1;
      });

      receitasPendentes.map((receita) => {
        receitasTotais += receita.valor;
        total_receita_pendentes += 1;
      });

      saldoPrevisto = saldoConta - despesasTotais + receitasTotais;

      const categories = await Categories.findAll({
        attributes: ['id', 'name', 'color', 'icon_url'],
      });

      const ultimasTransacoes = await Transactions.findAll({
        limit: 5,
        order: [['createdAt', 'desc']],
        include: [
          { model: Categories, as: 'categoria' },
          {
            model: Accounts,
            as: 'conta',
            include: [
              { model: Banks, as: 'bank' },
              { model: AccountsTypes, as: 'type' },
            ],
          },
        ],
      });

      const todasTransacoes = await Transactions.findAll({
        where: { efetivada: true },
      });

      todasTransacoes.map((transacao) => {
        totalMovimentacao += transacao.valor;
        if (transacao.tipo === 'RECEITA') {
          qtdReceitas += 1;
          totalReceitas += transacao.valor;
        }
        if (transacao.tipo === 'DESPESA') {
          qtdDespesas += 1;
          totalDespesas += transacao.valor;
        }
      });

      receitasMaisDespesas = totalReceitas + totalDespesas;

      return res.json({
        saldo: saldoConta,
        totalMovimentacao,

        saldo_previsto: saldoPrevisto,
        contas: accounts,
        total_despesas_pendentes,
        despesas_pendentes: despesasPendentes,
        total_receita_pendentes,
        receitas_pendentes: receitasPendentes,
        categorias: categories,
        ultimasTransacoes,
        totalReceitas,
        totalDespesas,
        qtdReceitas,
        qtdDespesas,
        receitasMaisDespesas,
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Dashboard.Unexpected.Get',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao buscar registros.',
        details: e.message,
        instance: '/dashboard/get',
      });
    }
  }
}
export default new DashboardController();
