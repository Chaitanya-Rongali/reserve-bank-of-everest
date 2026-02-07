'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return Promise.all([
      queryInterface.addColumn(
        'Customers', 
        'is_deleted', 
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue:false,
        },
      )
      ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Customers', 'is_deleted'),
    ]);
  }
};
