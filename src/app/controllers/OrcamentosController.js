import Categories from '../models/Categories';
import Categoria from '../models/Categories';
import Orcamentos from '../models/Orcamentos';
import Subcategorias from '../models/Subcategorias';
import Transactions from '../models/Transactions';

class OrcamentosController {
  async createOrcamento(req, res) {
    try {
      const { valor, periodo, categoria_id } = req.body;

      const ano = periodo.split('-')[0];
      const mes = periodo.split('-')[1];

      const create = await Orcamentos.create({
        valor,
        mes,
        ano,
        categoria_id,
        subcategoria_id: 1,
      });
      return res.json(create);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Orcamentos.Create.Unexpected.Create',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na criação.',
        details: e.message,
        instance: '/orcamentos/novo',
      });
    }
  }

  async getDetalhesOrcamentos(req, res) {
    const { id } = req.params;
    let valorTotal = 0;

    try {
      const orcamentos = await Orcamentos.findByPk(id);

      if (!orcamentos) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Orcamentos.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Registro não encontrado.',
          details: 'Registro não encontrado.',
          instance: `/orcamentos/detalhes/${id}`,
        });
      }

      const transactions = await Transactions.findAll({
        where: {
          categoria_id: orcamentos.categoria_id,
          efetivada: true,
          tipo: 'DESPESA',
        },
      });

      transactions.map((transaction) => {
        valorTotal += transaction.valor;
      });

      return res.json({ orcamentos, valorTotal });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Orcamentos.Detalhes.Unexpected.Create',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na criação.',
        details: e.message,
        instance: `/orcamentos/detalhes/${id}`,
      });
    }
  }

  async getAllOrcamentos(req, res) {
    try {
      const { mes, ano } = req.query;
      const orcamentos = await Orcamentos.findAll({
        where: { mes, ano },
        include: [{ model: Categories, as: 'categoria' }],
      });
      return res.json(orcamentos);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Orcamentos.Get.Unexpected.Create',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na criação.',
        details: e.message,
        instance: '/orcamentos/get/all',
      });
    }
  }
}

export default new OrcamentosController();
