'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // associate models
    await queryInterface.createTable('Cancels', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_book: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_refund: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      stk: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reason : {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Tôi không muốn đi nữa'
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
    await queryInterface.dropTable('Cancels')
  }
}