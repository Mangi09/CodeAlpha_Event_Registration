const express = require("express");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const path = require("path");
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

module.exports = app;
