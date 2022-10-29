import Accounts from '../models/Accounts';
import Transactions from '../models/Transactions';

class DespesasController {
  async createDespesa(req, res) {
    try {
      const {
        valor,
        data,
        data_vencimento,
        observacoes,
        categoria_id,
        recorrente,
        transacao_fixa,
        quantidade_repeticao,
        periodo_repeticao,
        efetivada,
        usuario_id,
        descricao,
        conta_id,
      } = req.body;
      const despesa = await Transactions.create({
        valor,
        descricao,
        data: data || new Date(),
        tipo: 'DESPESA',
        data_vencimento,
        observacoes,
        categoria_id,
        recorrente,
        transacao_fixa,
        quantidade_repeticao,
        periodo_repeticao,
        efetivada,
        usuario_id,
        conta_id,
      });

      const getConta = await Accounts.findOne({ where: { id: conta_id } });

      const novoSaldo = parseFloat(getConta.balance) - parseFloat(valor);

      if (efetivada) {
        await getConta.update({ balance: novoSaldo });
      }
      return res.json(despesa);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Expense.New.Unexpected.Create',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na criação.',
        details: e.message,
        instance: '/expense/new',
      });
    }
  }

  async getAllDespesas(req, res) {
    try {
      const despesas = await Transactions.findAll({
        where: { tipo: 'DESPESA' },
      });
      return res.json(despesas);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Expense.Get.All.Unexpected',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na busca dos registros.',
        details: e.message,
        instance: '/expense/get/all',
      });
    }
  }
}

export default new DespesasController();
