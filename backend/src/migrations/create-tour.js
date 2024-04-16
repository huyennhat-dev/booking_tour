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
        type: Sequelize.INTEGER
      },
      departure: {
        type: Sequelize.STRING
      },
      end_tour_day: {
        type: Sequelize.INTEGER
      },
      end_tour: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      initial_price: {
        type: Sequelize.FLOAT
      },
      promotional_price: {
        type: Sequelize.FLOAT
      },
      promotional: {
        type: Sequelize.FLOAT
      },
      introduce: {
        type: Sequelize.STRING
      },
      highlight: {
        type: Sequelize.STRING
      },
      insurance: {
        type: Sequelize.BOOLEAN
      },
      bus: {
        type: Sequelize.BOOLEAN
      },
      bicycle: {
        type: Sequelize.BOOLEAN
      },
      taxi: {
        type: Sequelize.BOOLEAN
      },
      plane: {
        type: Sequelize.BOOLEAN
      },
      meal: {
        type: Sequelize.BOOLEAN
      },
      photos: {
        type: Sequelize.STRING
      },
      tour_guide: {
        type: Sequelize.BOOLEAN
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