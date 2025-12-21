const Registration = require("../models/Registration");

exports.registerEvent = async (req, res) => {
  const registration = await Registration.create(req.body);
  res.status(201).json(registration);
};

exports.cancelRegistration = async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.json({ message: "Registration cancelled" });
};
