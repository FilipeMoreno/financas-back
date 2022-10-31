import Sequelize, { Model } from 'sequelize';

class Orcamentos extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: Sequelize.DOUBLE,
        mes: Sequelize.INTEGER,
        ano: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'orcamentos',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Categories, {
      foreignKey: 'categoria_id',
      as: 'categoria',
    });
    this.belongsTo(models.Subcategorias, {
      foreignKey: 'subcategoria_id',
      as: 'subcategoria',
    });
  }
}

export default Orcamentos;
