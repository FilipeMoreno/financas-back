const bcrypt = require('bcryptjs');

module.exports = {
  up: (QueryInterface) =>
    QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          username: 'Administrador',
          email: 'admin@redebattle.com.br',
          password_hash: bcrypt.hashSync('123456789', 8),
          refresh_token: 'none',
          token_expires_date: new Date(),
          level: 'ADMIN',
          is_vip: false,
          is_administrator: true,
          is_email_notification_enable: true,
          is_verified: true,
          is_validated: true,
          is_banned: false,
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
      { email: { [Op.in]: ['admin@redebattle.com.br'] } },
      {}
    );
  },
};
