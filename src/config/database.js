require('../bootstrap');

const TIMEZONE = 'America/Sao_Paulo';

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || 'postgres',
  protocol: 'postgres',
  storage: './__tests__/database.sqlite',
  // operatorsAliases: false,

  logging: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
    // freezeTableName: true,
  },
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: true,
    // ssl: { rejectUnauthorized: false },
    ssl: false,
  },
  timezone: TIMEZONE,
};
