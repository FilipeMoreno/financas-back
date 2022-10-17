import Sequelize from 'sequelize';

import AccountsTypes from '../app/models/AccountsTypes';
import Banks from '../app/models/Banks';
import Categories from '../app/models/Categories';
import CreditCardsFlags from '../app/models/CreditCardsFlags';
import Users from '../app/models/Users';

// CONFIGS
import databaseConfig from '../config/database';

const models = [Users, Categories, Banks, AccountsTypes, CreditCardsFlags];


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
