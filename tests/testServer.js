const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:', {
  logging: false,
});

const User = require('../src/models/user.model');
const Event = require('../src/models/events.model');
const Participants = require('../src/models/participants.model');

// Associations
Event.belongsToMany(User, { through: Participants, as: 'participants' });
User.belongsToMany(Event, { through: Participants, as: 'registeredEvents' });

app.use(express.json());

const authRouter = require('../src/routes/auth.router');
const eventRouter = require('../src/routes/event.router');
const participantRouter = require('../src/routes/participant.router');

app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);
app.use('/api', participantRouter);

module.exports = { app, sequelize, User, Event };
