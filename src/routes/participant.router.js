const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middlewares');
const registerForEvent = require('../controllers/participant.controller');

router.post('/events/:id/register', authenticate, registerForEvent);

module.exports = router;
