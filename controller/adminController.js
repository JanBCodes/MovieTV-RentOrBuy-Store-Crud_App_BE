const express = require("express");
const router = express.Router();

const movieServices = require("../services/movieServices.js")
const tvShowServices = require("../services/tvShowServices.js")

const dataValidation = require("../middleware/validation.js")
// const userValidation = require("../middleware/validation.js")

//Movies
router.get(`/movies`, movieServices.getAllMovies);
router.get(`/movies/:id`, movieServices.getASpecificMovie);
router.post(`/movies/`, dataValidation.validateIncomingTextData, movieServices.createAMovie);
router.put(`/movies/:id`, movieServices.updateAMovie);
router.delete(`/movies/:id`, movieServices.deleteAMovie);

//TvShows
router.get(`/tvShows`, tvShowServices.getAllTvShows);
router.get(`/tvShows/:id`, tvShowServices.getASpecificTvShow);
router.post(`/tvShows/`, tvShowServices.createATvShow);
router.put(`/tvShows/:id`, tvShowServices.updateTVShow);
router.delete(`/tvShows/:id`, tvShowServices.deleteATvShow);

module.exports = router;