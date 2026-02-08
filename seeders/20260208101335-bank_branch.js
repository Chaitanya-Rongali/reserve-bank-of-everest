'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bank_branches', [{
      branch_id: 'EVEKB-112-3344',
      Name: "Reseve-bank-of-Everest-bangalore",
      Address: "India,karnataka,banglore,Pincode:535215",
      bank_code: 'EVE-333-111',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bank_branches', null, {});
  }
};
