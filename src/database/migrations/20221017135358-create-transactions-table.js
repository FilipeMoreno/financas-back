module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('transacoes', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      data_vencimento: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      observacoes: {
        type: Sequelize.TEXT,
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      conta_id: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      recorrente: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      transacao_fixa: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      quantidade_repeticao: {
        type: Sequelize.INTEGER,
      },
      periodo_repeticao: {
        type: Sequelize.INTEGER,
      },
      efetivada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
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

  down: async (queryInterface) => queryInterface.dropTable('transacoes'),
};
