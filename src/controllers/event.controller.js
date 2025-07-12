const Event = require('../models/events.model');
const Category = require('../models/categories.model');

const { STATUS_CONST, MSG_CONST } = require('../constants/statusMessage.contants')

const addEvent = async (req, res) => {
  try {
    const { name, description, date, time, category, isAvailable = true } = req.body;

    if (!name || !description || !date || !time || !category) {
      return res.status(MSG_CONST.data_missing_error).json({ message: MSG_CONST.missing_fileds_error });
    }

    const event = await Event.create({ name, description, date, time, isAvailable });

    let categoryRecords = [];

    if (Array.isArray(category)) {
      for (const catName of category) {
        const [catRecord] = await Category.findOrCreate({
          where: { name: catName }
        });
        categoryRecords.push(catRecord);
      }
    } else {
      const [catRecord] = await Category.findOrCreate({
        where: { name: category }
      });
      categoryRecords.push(catRecord);
    }

    return res.status(STATUS_CONST.success_create).json({
      message: MSG_CONST.success_create,
      data: event
    });

  } catch (err) {
    console.error("Error creating event:", err);
    return res.status(STATUS_CONST.failure_create).json({ message: MSG_CONST.failure_create });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: ['participants']
    });
    return res.status(STATUS_CONST.success).json({ data: events, message: MSG_CONST.success });

  } catch (err) {
    return res.status(STATUS_CONST.data_missing_error).json({ message: MSG_CONST.failure });
  }
}

const editEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    if (!eventId) {
      return res.status(STATUS_CONST.data_missing_error).json({ message: MSG_CONST.missing_fileds_error });
    }

    const { name, description, date, time, isAvailable = true, category } = req.body;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.not_found_error });
    }

    // Update basic fields
    await event.update({ name, description, date, time, isAvailable });

    // Handle categories if provided
    if (category) {
      let categoryRecords = [];

      if (Array.isArray(category)) {
        for (const catName of category) {
          const [catRecord] = await Category.findOrCreate({ where: { name: catName } });
          categoryRecords.push(catRecord);
        }
      } else {
        const [catRecord] = await Category.findOrCreate({ where: { name: category } });
        categoryRecords.push(catRecord);
      }

      // Set new categories (this replaces old ones)
      await event.setCategories(categoryRecords);
    }

    return res.status(STATUS_CONST.success).json({
      message: MSG_CONST.success_update,
      data: event
    });

  } catch (err) {
    console.error("Error updating event:", err);
    return res.status(STATUS_CONST.failure_update).json({ message: MSG_CONST.failure_update });
  }
};


const removeEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId ?? null;
    console.log("eventId", eventId);
    if (eventId) {
      const event = await Event.findOne({
        where: { id: Number(eventId) }
      });
      if (event) {
        await event.destroy();
        return res.status(STATUS_CONST.success).json({ message: MSG_CONST.success });
      } else {
        return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.not_found_error });
      }
    }
    return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.not_found_error });
  } catch {
    return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.not_found_error });
  }
}

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId ?? null;
    console.log("eventId", eventId);
    if (eventId) {
      const event = await Event.findOne({
        where: { id: Number(eventId) },
        // include: ['participants', 'categories']
        include: ['participants']
      });
      if (event) {
        return res.status(STATUS_CONST.success).json({ message: MSG_CONST.success, data: event });
      } else {
        return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.not_found_error });
      }
    }
    return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.not_found_error });
  } catch {
    return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.not_found_error });
  }
}


module.exports = { addEvent, getAllEvents, editEvent, removeEvent, getEventById }