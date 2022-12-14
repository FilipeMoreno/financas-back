import Accounts from '../models/Accounts';
import SaldoTransacoes from '../models/SaldoTransacoes';
import Transactions from '../models/Transactions';

class ReceitasController {
  async createReceita(req, res) {
    try {
      let saldoConta = 0;

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
        conta_id,
        descricao,
      } = req.body;

      const receita = await Transactions.create({
        valor,
        descricao,
        data: data || new Date(),
        tipo: 'RECEITA',
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
      const getAllAccounts = await Accounts.findAll();

      const novoSaldo = parseFloat(getConta.balance) + parseFloat(valor);

      if (efetivada) {
        getAllAccounts.map((account) => {
          saldoConta += account.balance;
        });
        const createSaldoTransacoes = await SaldoTransacoes.create({
          saldo_anterior: saldoConta,
          novo_saldo: saldoConta + parseFloat(valor),
          transacao_id: receita.id,
        });

        await getConta.update({ balance: novoSaldo });
      }

      return res.json(receita);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Transaction.New.Unexpected.Create',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na criação.',
        details: e.message,
        instance: '/receitas/new',
      });
    }
  }

  async getAllReceitas(req, res) {
    try {
      const receita = await Transactions.findAll({
        where: { tipo: 'RECEITA' },
      });
      return res.json(receita);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Expense.Get.All.Unexpected',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na busca dos registros.',
        details: e.message,
        instance: '/receitas/get/all',
      });
    }
  }
}

export default new ReceitasController();
