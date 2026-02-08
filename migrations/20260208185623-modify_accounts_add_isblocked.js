'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Accounts',
        'isBlocked',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      ),
    ]);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Accounts', 'isBlocked')
  }
};
