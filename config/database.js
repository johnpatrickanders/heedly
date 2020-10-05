const config = require('./');
const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  test: {
    dialect: "sqlite",
    DB_CONN: "sqlite.memory",
    logging: false,
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'postgres://xhczitiwyovztz:d436fcf055fe8a34140f0768776af38cd7f71c7535cf550a3fa55841ed272626@ec2-54-164-134-207.compute-1.amazonaws.com:5432/dea18sf3euu0dv',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};
