const STR_CONST = {
  organizer: 'Organizer',
  attendee: 'Attendee'
};

const EVENT_CATEGORIES = [
    "KIDS",
    "ADULTS",
    "COMEDY",
    "DRAMA",
    "MUSIC",
    "PARTY"
]

module.exports = {
  STR_CONST,
  SALT_ROUNDS: 10,
  USER_ROLES: [STR_CONST.organizer, STR_CONST.attendee],
  EVENT_CATEGORIES
};