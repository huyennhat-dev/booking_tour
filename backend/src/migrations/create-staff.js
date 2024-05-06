'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // associate models
    await queryInterface.createTable('Staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_account: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_manager: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      birthday: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
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
    await queryInterface.dropTable('Staffs')
  }
}