'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id_tour: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_customer: {
        type: Sequelize.INTEGER
      },
      guest_number: {
        type: Sequelize.INTEGER
      },
      date_booked: {
        type: Sequelize.STRING
      },
      complete: {
        type: Sequelize.BOOLEAN
      },
      evaluate: {
        type: Sequelize.STRING
      },
      point_evaluate: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};