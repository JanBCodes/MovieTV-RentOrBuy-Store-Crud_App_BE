const express = require("express");
const router = express.Router();

// const validation = require("../middleware/validation.js")
const userServices = require("../services/userServices.js")


router.post(`/login`, userServices.userLogin)
router.post(`/`, userServices.createAUser)
router.put(`/:id`, userServices.updateUser);
router.delete(`/:id`, userServices.deleteUser);

module.exports = router;