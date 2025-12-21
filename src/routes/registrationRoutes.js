const express = require("express");
const router = express.Router();
const {
  registerEvent,
  cancelRegistration,
} = require("../controllers/registrationController");

router.post("/", registerEvent);
router.delete("/:id", cancelRegistration);

module.exports = router;
