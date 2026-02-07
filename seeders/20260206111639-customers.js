'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Customers', [{
      firstName: 'Chaitanya',
      lastName: 'Rongali',
      email: 'Chaitanykumar6302@gmial.com',
      mobile_number: 6309808374,
      adhar_number: '323238541765',
      pan_number: 'ABCDE1234F',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Rakesh',
      lastName: 'Rongali',
      email: 'Pavan6302@gmial.com',
      mobile_number: 6309808384,
      adhar_number: '323238541865',
      pan_number: 'ABCDE1235F',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Lokesh',
      lastName: 'Rongali',
      email: 'Lokesh6302@gmial.com',
      mobile_number: 6309858374,
      adhar_number: '323248541765',
      pan_number: 'AGCDE1234F',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Pavan',
      lastName: 'Rongali',
      email: 'Pavan6303@gmial.com',
      mobile_number: 6305808374,
      adhar_number: '329238541765',
      pan_number: 'ABRDE1234F',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
