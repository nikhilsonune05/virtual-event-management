const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Participants = sequelize.define('Participants', {
  EventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'id'
    }
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  tableName: 'Participants',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['EventId', 'UserId'] // ✅ correct composite uniqueness
    }
  ]
});

module.exports = Participants;
