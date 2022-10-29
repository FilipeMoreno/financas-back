import Sequelize, { Model } from 'sequelize';

class Transactions extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
        valor: Sequelize.DOUBLE,
        tipo: Sequelize.STRING,
        data: Sequelize.DATE,
        data_vencimento: Sequelize.DATE,
        observacoes: Sequelize.STRING,
        recorrente: Sequelize.BOOLEAN,
        transacao_fixa: Sequelize.BOOLEAN,
        quantidade_repeticao: Sequelize.INTEGER,
        periodo_repeticao: Sequelize.INTEGER,
        efetivada: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'transacoes',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Categories, {
      foreignKey: 'categoria_id',
      as: 'categoria',
    });

    this.belongsTo(models.Users, {
      foreignKey: 'usuario_id',
      as: 'usuario',
    });

    this.belongsTo(models.Accounts, {
      foreignKey: 'conta_id',
      as: 'conta',
    });
  }
}

export default Transactions;
