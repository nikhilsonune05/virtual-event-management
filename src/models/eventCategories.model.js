const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const EventCategories = sequelize.define('EventCategories', {
  EventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  }
}, {
  tableName: 'EventCategories',
  timestamps: true
});

module.exports = EventCategories;
