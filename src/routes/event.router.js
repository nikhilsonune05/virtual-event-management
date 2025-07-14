const express = require('express');
const router = express.Router();

const { addEvent, getAllEvents, editEvent, removeEvent, getEventById } = require('../controllers/event.controller');

router.post('/', addEvent);
router.get('/', getAllEvents);
router.patch('/:eventId', editEvent);
router.delete('/:eventId', removeEvent);
router.get('/:eventId', getEventById);

module.exports = router;