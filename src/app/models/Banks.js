import Sequelize, { Model } from 'sequelize';

class Banks extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        color: Sequelize.STRING,
        icon_url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Banks;
