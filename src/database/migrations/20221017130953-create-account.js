module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_id: {
        type: Sequelize.INTEGER,
        references: { model: 'banks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts_types', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      initial_amount_value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('accounts'),
};
