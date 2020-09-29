'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ leaning: 1, email: 'demo@example.com', hashedPassword: createPassword(), firstName: 'Demo' }),
      r({ leaning: 1, email: 'yusuke@example.com', hashedPassword: createPassword(), firstName: 'Yusuke' }),
      r({ leaning: 1, email: 'petra@example.com', hashedPassword: createPassword(), firstName: 'Petra' }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
