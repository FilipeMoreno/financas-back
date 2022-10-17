import Sequelize, { Model } from 'sequelize';

class CreditCardsFlags extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        color: Sequelize.STRING,
        icon_url: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'credit_cards_flags',
      }
    );

    return this;
  }
}

export default CreditCardsFlags;
