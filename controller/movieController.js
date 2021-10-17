const express = require("express");
const router = express.Router();

const movieServices = require("../services/movieServices.js")

router.get(`/`, movieServices.getAllMovies);
router.get(`/:id`, movieServices.getASpecificMovie);
router.post(`/search`, movieServices.searchMovie);


module.exports = router;