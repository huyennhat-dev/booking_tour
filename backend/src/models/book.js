'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations .
     * This method is not a part of Sequelize lifecycle .
     * The `models/index` file will call this method automatically .
     */
    static associate(models) {
      // define association here
      
    }
  }
  Book.init({
    id_booked_tour: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_tour: DataTypes.INTEGER,
    id_customer: DataTypes.INTEGER,
    guest_number: DataTypes.INTEGER,
    date_booked: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    evaluate: DataTypes.STRING,
    point_evaluate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book'
  })
  return Book
}