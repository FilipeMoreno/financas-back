import Accounts from '../models/Accounts';
import Banks from '../models/Banks';
import Categories from '../models/Categories';
import Subcategorias from '../models/Subcategorias';
import Transactions from '../models/Transactions';

class TransactionsController {
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transactions.findAll({
        include: [
          {
            model: Categories,
            as: 'categoria',
            include: [{ model: Subcategorias, as: 'subcategorias' }],
          },
          {
            model: Accounts,
            as: 'conta',
            include: [{ model: Banks, as: 'bank' }],
          },
        ],
        order: [['data', 'DESC']],
      });
      return res.json(transactions);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Transactions.Get.All.Unexpected',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na busca dos registros.',
        details: e.message,
        instance: '/transacoes/get/all',
      });
    }
  }

  async efetivarTransacao(req, res) {
    const { id } = req.params;
    try {
      const getTransaction = await Transactions.findByPk(id);

      if (!getTransaction) {
        return res.status(400).json({
          status: 400,
          success: false,
          type: 'Transactions.Done.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Registro não encontrado.',
          details: 'Registro não encontrado.',
          instance: '/transacoes/efetivar/:id',
        });
      }

      const getConta = await Accounts.findOne({
        where: { id: getTransaction.conta_id },
      });

      if (getTransaction.tipo === 'RECEITA') {
        const novoSaldo =
          parseFloat(getConta.balance) + parseFloat(getTransaction.valor);

        await getConta.update({ balance: novoSaldo });
      } else {
        const novoSaldo =
          parseFloat(getConta.balance) - parseFloat(getTransaction.valor);

        await getConta.update({ balance: novoSaldo });
      }

      const efetivado = await getTransaction.update({ efetivada: true });
      return res.json(efetivado);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Transactions.Done.All.Unexpected',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na busca dos registros.',
        details: e.message,
        instance: `/transacoes/efetivar/${id}`,
      });
    }
  }
}

export default new TransactionsController();
