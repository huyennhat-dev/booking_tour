'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association here
      Customer.belongsTo(models.User, {
        foreignKey: 'id_customer',
        as: 'userData'
      })

    }
  }
  Customer.init({
    id_customer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: DataTypes.STRING,
    birth_day: DataTypes.STRING,
    point_evaluation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer'
  })
  return Customer
}