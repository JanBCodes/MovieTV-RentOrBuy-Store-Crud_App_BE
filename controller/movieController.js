const express = require("express");
const router = express.Router();

const movieServices = require("../services/movieServices.js")
const dataValidation = require("../middleware/validation.js")

router.get(`/`, movieServices.getAllMovies);
router.get(`/:id`, movieServices.getASpecificMovie);
router.post(`/`, dataValidation.validateIncomingTextData, movieServices.createAMovie);
router.put(`/:id`, movieServices.updateAMovie);
router.delete(`/:id`, movieServices.deleteAMovie);

router.post(`/search`, movieServices.searchMovie);


module.exports = router;