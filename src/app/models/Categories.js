import Sequelize, { Model } from 'sequelize';

class Categories extends Model {
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

  static associate(models) {
    this.belongsToMany(models.Subcategorias, {
      through: 'categoria_subcategoria',
      as: 'subcategorias',
      foreignKey: 'categoria_id',
    });
  }
}

export default Categories;
