const bcrypt = require('bcryptjs');

module.exports = {
  up: (QueryInterface) =>
    QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@filipemoreno.com.br',
          password: bcrypt.hashSync('123456789', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(
      'users',
      { email: { [Op.in]: ['admin@filipemoreno.com.br'] } },
      {}
    );
  },
};
