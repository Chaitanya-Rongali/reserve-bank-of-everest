'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('banks', [
      {
        bank_code: 'EVE-333-111',
        Name: 'Reserve-bank-of-Eversest',
        Address:'India,karanataka',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('banks', null, {});
  }
};
