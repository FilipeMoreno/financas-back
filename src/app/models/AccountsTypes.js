import Sequelize, { Model } from 'sequelize';

class AccountsTypes extends Model {
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

export default AccountsTypes;
