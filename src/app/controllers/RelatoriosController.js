import { Op, Sequelize } from 'sequelize';

import Categories from '../models/Categories';
import SaldoTransacoes from '../models/SaldoTransacoes';
import Transactions from '../models/Transactions';

class RelatoriosController {
  async getDespesas7Dias(req, res) {
    try {
      const transacoes = await Transactions.findAll({
        where: {
          tipo: 'DESPESA',
          createdAt: {
            [Op.gt]: new Date().getDate() - 7,
            [Op.lt]: new Date(),
          },
        },
        include: [{ model: Categories, as: 'categoria' }],
      });

      return res.json(transacoes);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }

  async getReceitas7Dias(req, res) {
    try {
      const transacoes = await Transactions.findAll({
        where: {
          tipo: 'RECEITA',
          createdAt: {
            [Op.gt]: new Date().getDate() - 7,
            [Op.lt]: new Date(),
          },
        },
        include: [{ model: Categories, as: 'categoria' }],
      });

      return res.json(transacoes);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }

  async getTransactions7dias(req, res) {
    try {
      const transacoes = await Transactions.findAll({
        where: {
          createdAt: {
            [Op.gt]: new Date().getDate() - 7,
            [Op.lt]: new Date(),
          },
        },
        include: [{ model: Categories, as: 'categoria' }],
      });

      return res.json(transacoes);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }

  async getDespesasCategorias(req, res) {
    try {
      const transacoes = await Transactions.findAll({
        where: {
          tipo: 'DESPESA',
        },
        include: [{ model: Categories, as: 'categoria' }],
      });

      return res.json(transacoes);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }

  async getReceitasCategorias(req, res) {
    try {
      const transacoes = await Transactions.findAll({
        where: {
          tipo: 'RECEITA',
        },
        include: [{ model: Categories, as: 'categoria' }],
      });

      return res.json(transacoes);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }

  async getReceitasXDespesas(req, res) {
    try {
      let amountReceitas = 0;
      let amountDespesas = 0;
      let amountReceitaPrevistaAUX = 0;
      let amountDespesaPrevistaAUX = 0;
      let amountReceitasPrevisto = 0;
      let amountDespesasPrevisto = 0;

      const getTransacao = await Transactions.findAll({
        include: [
          {
            model: Categories,
            as: 'categoria',
            attributes: ['name', 'color', 'icon_url'],
          },
        ],
        order: [['createdAt', 'desc']],
      });

      getTransacao.map((despesa) => {
        if (despesa.tipo === 'DESPESA') {
          if (despesa.efetivada) {
            amountDespesas += despesa.valor;
          } else {
            amountDespesaPrevistaAUX += despesa.valor;
          }
        }
      });

      getTransacao.map((receita) => {
        if (receita.tipo === 'RECEITA') {
          if (receita.efetivada) {
            amountReceitas += receita.valor;
          } else {
            amountReceitaPrevistaAUX += receita.valor;
          }
        }
      });

      amountReceitasPrevisto = amountReceitaPrevistaAUX + amountReceitas;
      amountDespesasPrevisto = amountDespesaPrevistaAUX + amountDespesas;

      return res.json({
        amountReceitas,
        amountDespesas,
        amountDespesasPrevisto,
        amountReceitasPrevisto,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }

  async getNovoSaldoSaldoAnterior(req, res) {
    try {
      const getSaldoTransacoes = await SaldoTransacoes.findAll({
        order: [['createdAt', 'desc']],
        include: [
          {
            model: Transactions,
            as: 'transacao',
          },
        ],
      });

      return res.json(getSaldoTransacoes);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }
}

export default new RelatoriosController();
