import Banks from '../models/Banks';

class BanksController {
  // Busca todas os bancos cadastrados
  async getAllBanks(req, res) {
    try {
      const banks = await Banks.findAll();
      if (banks.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Banks.Get.All.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Banco não encontrado.',
          instance: '/banks/get/all',
        });
      }
      return res.json(banks);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Banks.Get.All.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao buscar registros.',
        details: e.message,
        instance: '/banks/get/all',
      });
    }
  }

  // Busca um banco pelo Nome
  async getBankByName(req, res) {
    const { name } = req.params;
    try {
      const getBank = await Banks.findOne({ where: { name } });

      if (!getBank) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Banks.Get.Name.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Banco não encontrada.',
          instance: '/banks/get/name',
        });
      }
      return res.json(getBank);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Banks.Get.Name.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao buscar registros.',
        details: e.message,
        instance: `/banks/get/name/${name}`,
      });
    }
  }

  // Busca um banco pelo ID
  async getBankByID(req, res) {
    const { id } = req.params;
    try {
      const getBank = await Banks.findByPk(id);

      if (!getBank) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Banks.Get.ID.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Banco não encontrado.',
          instance: `/banks/get/id/${id}`,
        });
      }
      return res.json(getBank);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Banks.Get.ID.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao buscar registros.',
        details: e.message,
        instance: `/banks/get/name/${id}`,
      });
    }
  }

  // Cadastra um novo banco
  async createNewBank(req, res) {
    try {
      const { name, color, icon_url } = req.body;
      const newBank = await Banks.create({ name, color, icon_url });
      return res.json(newBank);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Banks.Create.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao criar o registro.',
        details: e.message,
        instance: '/banks/new',
      });
    }
  }

  // Deletar um banco pelo ID
  async deleteBank(req, res) {
    const { id } = req.params;
    try {
      const getBank = await Banks.findByPk(id);

      if (!getBank) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Banks.Delete.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Banco não encontrada.',
          instance: `/banks/delete/${id}`,
        });
      }
      await Banks.destroy({ where: id });
      return res.json({
        status: 200,
        success: true,
        type: 'Banks.Deleted.Successfully',

        message: 'Banco deletado com sucesso.',
        instance: `/banks/delete/${id}`,
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Banks.Delete.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao deletar o registro.',
        details: e.message,
        instance: `/banks/delete/${id}`,
      });
    }
  }

  // Editar um banco pelo ID
  async editBank(req, res) {
    const { id } = req.params;
    try {
      const { name, color, icon_url } = req.body;
      const getBank = await Banks.findByPk(id);

      if (!getBank) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Banks.Edit.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Banco não encontrado.',
          instance: `/banks/edit/${id}`,
        });
      }
      const bankEdited = await getBank.update({
        name,
        color,
        icon_url,
      });
      return res.json(bankEdited);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Banks.Edit.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao editar o registro.',
        details: e.message,
        instance: `/bank/edit/${id}`,
      });
    }
  }
}
export default new BanksController();
