const express = require("express");
const router = express.Router();

const adminServices = require("../services/adminServices.js")
const movieServices = require("../services/movieServices.js")
const tvShowServices = require("../services/tvShowServices.js")
const userServices= require("../services/userServices.js")

const dataValidation = require("../middleware/validation.js")
// const userValidation = require("../middleware/validation.js")

//Movies
router.get(`/movies`, movieServices.getAllMovies);
router.get(`/movies/:id`, movieServices.getASpecificMovie);
router.post(`/movies/`, dataValidation.validateIncomingData, adminServices.createAMovie);
router.put(`/movies/:id`, adminServices.updateAMovie);
router.delete(`/movies/:id`, adminServices.deleteAMovie);

//TvShows
router.get(`/tvShows`, tvShowServices.getAllTvShows);
router.get(`/tvShows/:id`, tvShowServices.getASpecificTvShow);
router.post(`/tvShows/`, dataValidation.validateIncomingData, adminServices.createATvShow);
router.put(`/tvShows/:id`, adminServices.updateTVShow);
router.delete(`/tvShows/:id`, adminServices.deleteATvShow);

//Users
router.get(`/user`, userServices.displayAllUsers);
router.post(`/user/`, userServices.createAUser);
router.put(`/user/:id`, userServices.updateUser);
router.delete(`/user/:id`, userServices.deleteUser);

module.exports = router;