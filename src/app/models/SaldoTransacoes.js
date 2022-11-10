import Sequelize, { Model } from 'sequelize';

class SaldoTransacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        saldo_anterior: Sequelize.STRING,
        novo_saldo: Sequelize.DOUBLE,
      },
      {
        sequelize,
        tableName: 'saldo_transacoes',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Transactions, {
      foreignKey: 'transacao_id',
      as: 'transacao',
    });
  }
}

export default SaldoTransacoes;
