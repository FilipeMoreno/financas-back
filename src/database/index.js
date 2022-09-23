import Sequelize from 'sequelize';

import Users from '../app/models/Users';
import databaseConfig from '../config/database';

const models = [Users];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
    this.connection
      .authenticate()
      .then(() => {
        console.log('\n[PG] Banco conectado com sucesso!');
      })
      .catch((err) => {
        console.log(
          `\n[PG] Ocorreu um erro na conexão com a database. \nErro: ${err}`
        );
      });
  }
}

export default new Database();
