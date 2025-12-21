const Registration = require("../models/Registration");

exports.registerEvent = async (req, res) => {
  const { name, email, event } = req.body;

  // Validation
  if (!name || !email || !event) {
    return res.status(400).json({
      error: "Name, email, and event ID are required",
    });
  }

  // Simple email format check
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Please enter a valid email address",
    });
  }

  try {
    const registration = await Registration.create(req.body);
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: "Failed to register for event" });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel registration" });
  }
};
