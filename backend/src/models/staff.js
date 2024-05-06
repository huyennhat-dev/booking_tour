'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations .
     * This method is not a part of Sequelize lifecycle .
     * The `models/index` file will call this method automatically .
     */
    static associate(models) {
      // define association here
      models.Staff.belongsTo(models.Account, {
        foreignKey: 'id_account',
        as: 'accountData'
      })

      models.Staff.belongsTo(models.Manager, {
        foreignKey: 'id_manager',
        as: 'managerData'
      })


    }
  }
  Staff.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_account: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_manager: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'Staff'
  })
  return Staff
}