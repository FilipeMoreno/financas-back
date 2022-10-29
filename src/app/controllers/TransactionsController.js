import Categories from '../models/Categories';
import Transactions from '../models/Transactions';

class TransactionsController {
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transactions.findAll({
        include: [{ model: Categories, as: 'categoria' }],
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
}

export default new TransactionsController();
