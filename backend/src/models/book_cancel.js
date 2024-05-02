'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class BookCancel extends Model {
    /**
     * Helper method for defining associations .
     * This method is not a part of Sequelize lifecycle .
     * The `models/index` file will call this method automatically .
     */
    static associate(models) {
      // define association here
      models.Cancel.belongsTo(models.Book, {
        foreignKey: 'id_book',
        as: 'bookCancelData'
      })
    }
  }
  BookCancel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_book: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_refund: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    stk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reason : {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Tôi không muốn đi nữa'
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
    modelName: 'Cancel',
  })
  return BookCancel
}