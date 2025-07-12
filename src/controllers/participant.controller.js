const Event = require('../models/events.model');
const User = require('../models/user.model');

const registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    const { id: eventId } = req.params;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'Attendee') {
      return res.status(403).json({ message: 'Only attendees can register for events' });
    }

    const isAlreadyRegistered = await event.hasParticipant(user);
    if (isAlreadyRegistered) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }

    await event.addParticipant(user);
    return res.status(200).json({ message: 'Successfully registered for the event' });

  } catch (err) {
    console.error('Registration failed:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = registerForEvent;