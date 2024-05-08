'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations .
     * This method is not a part of Sequelize lifecycle .
     * The `models/index` file will call this method automatically .
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

      Tour.hasMany(models.Book, {
        foreignKey: 'id_tour',
        as: 'tourBookingData'
      })
    }
  }
  Tour.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tour_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    initial_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    departure_day: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_tour_day: {
      type: DataTypes.DATE,
      allowNull: false
    },
    promotional: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.1
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    vehicle: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    photos : {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      defaultValue: ''
    },
    highlight: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      defaultValue: ''
    },
    introduce: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      defaultValue: ''
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    id_staff : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_manager : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    insurance : {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    meal : {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    max_user : {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10
    },
    total_sale : {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    point_rating : {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 5
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'Tour'
  })
  return Tour
}