'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Manager.init({
    id_manager: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_name: DataTypes.STRING,
    point_evaluation: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    birth_day: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manager'
  })
  return Manager
}