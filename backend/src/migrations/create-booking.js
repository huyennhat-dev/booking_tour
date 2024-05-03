'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // associate models
    await queryInterface.createTable('Books', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_tour: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'success'
      },
      booking_info: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      member : {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      day_booking: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      isCheckout: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books')
  }
}