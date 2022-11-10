module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('saldo_transacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      saldo_anterior: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      novo_saldo: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      transacao_id: {
        type: Sequelize.INTEGER,
        references: { model: 'transacoes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

  down: async (queryInterface) => queryInterface.dropTable('saldo_transacoes'),
};
