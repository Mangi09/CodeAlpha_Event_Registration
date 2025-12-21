const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  image: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
