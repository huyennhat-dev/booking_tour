'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Staff.belongsTo(models.User, {
        foreignKey: 'id_staff',
        as: 'userData'
      })

      Staff.belongsTo(models.Manager, {
        foreignKey: 'id_manager',
        as: 'managerData'
      })
    }
  }
  Staff.init({
    id_staff: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_manager: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    birth_day: DataTypes.STRING,
    point_evaluation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Staff'
  })
  return Staff
}