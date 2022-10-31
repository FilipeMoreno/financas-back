import Sequelize, { Model } from 'sequelize';

class Subcategorias extends Model {
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

export default Subcategorias;
