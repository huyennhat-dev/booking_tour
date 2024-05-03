'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Tour, {
        foreignKey: 'id_tour',
        as: 'tourData'
      })
      Book.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'userData'
      })
      Book.hasOne(models.Cancel,{
        foreignKey: 'id_book',
        as: 'cancelData'
      })
    }
  }
  Book.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_tour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'success'
    },
    booking_info: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    member : {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_booking: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    isCheckout: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'Book'
  })
  return Book
}