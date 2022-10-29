import Sequelize, { Model } from 'sequelize';

import Despesas from './Transactions';

class Accounts extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        initial_amount_value: Sequelize.DOUBLE,
        balance: Sequelize.DOUBLE,
        color: Sequelize.STRING,
      },
      {
        tableName: 'accounts',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Banks, {
      foreignKey: 'bank_id',
      as: 'bank',
    });

    this.belongsTo(models.AccountsTypes, {
      foreignKey: 'type_id',
      as: 'type',
    });
  }
}

export default Accounts;
