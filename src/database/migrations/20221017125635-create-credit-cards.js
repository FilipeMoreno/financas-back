module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('credit_cards', {
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
      limit: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      amount_available: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      billing_cycle_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      billing_due_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flag_id: {
        type: Sequelize.INTEGER,
        references: { model: 'credit_cards_flags', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      account_id: {
        type: Sequelize.INTEGER,
        references: { model: 'account_id', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
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

  down: async (queryInterface) => queryInterface.dropTable('credit_cards'),
};
