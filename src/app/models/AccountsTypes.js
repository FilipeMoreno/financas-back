import Sequelize, { Model } from 'sequelize';

class AccountTypes extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        tableName: 'accounts_types',
        sequelize,
      }
    );

    return this;
  }
}

export default AccountTypes;
