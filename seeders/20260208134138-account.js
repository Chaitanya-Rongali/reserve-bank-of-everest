'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Accounts', [{
        account_number: '73144747831',
        account_type:"Savings Account",
        balance:25000,
        branch_id:"EVEKB-112-3344",
        customer_id:10,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
