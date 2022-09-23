import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password_user: Sequelize.VIRTUAL,
        confirm_password: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password_user) {
        user.password = await bcrypt.hash(user.password_user, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Users;
