'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init({
    id_team: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_manager: DataTypes.INTEGER,
    id_staff: DataTypes.INTEGER,
    work_day: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team'
  })
  return Team
}