'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      id_tour: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_tour: {
        type: Sequelize.STRING
      },
      id_manager: {
        type: Sequelize.INTEGER
      },
      id_staff: {
        type: Sequelize.INTEGER
      },
      departure_day: {
        type: Sequelize.STRING
      },
      end_tour_day: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      initial_price: {
        type: Sequelize.FLOAT
      },
      promotional: {
        type: Sequelize.FLOAT
      },
      introduce: {
        type: Sequelize.TEXT('long')
      },
      highlight: {
        type: Sequelize.TEXT('long')
      },
      insurance: {
        type: Sequelize.BOOLEAN
      },
      vehicle: {
        type: Sequelize.STRING
      },
      meal: {
        type: Sequelize.BOOLEAN
      },
      photos: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('Tours');
  }
};