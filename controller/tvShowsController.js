const express = require("express");
const router = express.Router();

const tvShowServices = require("../services/tvShowServices.js")

router.get(`/`, tvShowServices.getAllTvShows);
router.get(`/:id`, tvShowServices.getASpecificTvShow);
router.post(`/search`, tvShowServices.searchTvShow);

module.exports = router;
