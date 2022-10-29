import Accounts from '../models/Accounts';

class AccountsController {
  // Criar uma nova conta
  async createAccount(req, res) {
    try {
      const { name, type, balance, color, bank } = req.body;

      const account = await Accounts.create({
        name,
        type_id: type,
        bank_id: bank,
        initial_amount_value: balance,
        balance,
        color,
      });

      return res.json(account);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Account.Create.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao criar o registro.',
        details: e.message,
        instance: '/accounts/create',
      });
    }
  }

  // Buscar todas as contas
  async getAccounts(req, res) {
    try {
      const accounts = await Accounts.findAll({
        include: [
          {
            association: 'type',
            attributes: ['id', 'name', 'icon_url'],
          },
          {
            association: 'bank',
            attributes: ['id', 'name', 'icon_url', 'color'],
          },
        ],
        order: [['name', 'ASC']],
      });

      return res.json(accounts);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Account.Get.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao listar o registro.',
        details: e.message,
        instance: '/accounts/get/all',
      });
    }
  }
}

export default new AccountsController();
