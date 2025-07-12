const Event = require("./models/events.model");
const User = require("./models/user.model");
const Participants = require('./models/participants.model');

// Associations
Event.belongsToMany(User, { through: Participants, as: 'participants' });
User.belongsToMany(Event, { through: Participants, as: 'registeredEvents' });

module.exports = { User, Event, Participants };
