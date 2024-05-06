'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // associate models
    await queryInterface.createTable('Tours', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tour_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      initial_price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      departure_day: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_tour_day: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      promotional: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.1
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      vehicle: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      photos : {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      highlight: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      introduce: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      id_staff : {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_manager : {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      insurance : {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      meal : {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      max_user : {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 10
      },
      total_sale : {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      point_rating : {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 5
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours')
  }
}