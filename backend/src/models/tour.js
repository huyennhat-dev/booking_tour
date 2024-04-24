'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.belongsTo(models.Manager, {
        foreignKey: 'id_manager',
        as: 'managerData'
      })

      Tour.belongsTo(models.Staff, {
        foreignKey: 'id_staff',
        as: 'staffData'
      })
    }
  }
  Tour.init({
    id_tour: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_tour: DataTypes.STRING,
    id_manager: DataTypes.INTEGER,
    id_staff: DataTypes.INTEGER,
    departure_day: DataTypes.INTEGER,
    departure: DataTypes.STRING,
    end_tour_day: DataTypes.INTEGER,
    end_tour: DataTypes.STRING,
    destination: DataTypes.STRING,
    initial_price: DataTypes.FLOAT,
    promotional_price: DataTypes.FLOAT,
    promotional: DataTypes.FLOAT,
    introduce: DataTypes.STRING,
    highlight: DataTypes.STRING,
    insurance: DataTypes.BOOLEAN,
    bus: DataTypes.BOOLEAN,
    bicycle: DataTypes.BOOLEAN,
    taxi: DataTypes.BOOLEAN,
    plane: DataTypes.BOOLEAN,
    meal: DataTypes.BOOLEAN,
    photos: DataTypes.STRING,
    tour_guide: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tour'
  })
  return Tour
}