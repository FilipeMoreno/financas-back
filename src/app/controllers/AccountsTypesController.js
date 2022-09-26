import AccountTypes from '../models/AccountsTypes';

class AccountsTypesController {
  // Busca todos os tipos de contas disponíveis
  async getAllTypes(req, res) {
    try {
      const types = await AccountTypes.findAll();
      if (types.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'AccountTypes.Get.All.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Tipos de contas não cadastrado.',
          instance: '/accounts/types/get/all',
        });
      }
      return res.json(types);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'AccountTypes.Get.All.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao buscar registros.',
        details: e.message,
        instance: '/accounts/types/get/all',
      });
    }
  }
}
export default new AccountsTypesController();
