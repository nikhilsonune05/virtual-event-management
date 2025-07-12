
const { DataTypes } = require('sequelize');

const sequelize = require('../../config/database');
const { USER_ROLES } = require("../constants/shared.constants");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.INTEGER
  },
  role: {
    type: DataTypes.ENUM(...USER_ROLES),
    allowNull: false
  },
  timestamps: true,
  tableName: 'users',
});

module.exports = User;