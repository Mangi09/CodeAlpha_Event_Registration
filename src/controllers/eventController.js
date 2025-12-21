const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const { title, date } = req.body;

  // Validation
  if (!title || !date) {
    return res.status(400).json({
      error: "Event title and date are required",
    });
  }

  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
