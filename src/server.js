const express = require('express');
const app = express();
const sequelize = require('../config/database');
const { User, Event, Participants } = require('./associations');

const authRouter = require('./routes/auth.router');
const eventRouter = require('./routes/event.router');
const participantRouter = require('./routes/participant.router');

require('dotenv').config();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);
app.use('/api', participantRouter);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    // Force clean all tables
    await sequelize.sync({ force: true, logging: console.log });
    console.log('Database synced');

    app.listen(PORT, () => {
      console.log(`Server started successfully on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
  }
})();
