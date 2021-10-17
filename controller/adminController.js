const express = require("express");
const router = express.Router();

const adminServices = require("../services/adminServices.js")
const movieServices = require("../services/movieServices.js")
const tvShowServices = require("../services/tvShowServices.js")
const userServices= require("../services/userServices.js")

const dataValidation = require("../middleware/validation.js")
const {checkForAuth} = require("../middleware/auth.js")

//Movies
router.get(`/movies`, movieServices.getAllMovies);
router.get(`/movies/:id`, movieServices.getASpecificMovie);
router.post(`/movies/`, dataValidation.validateIncomingData, checkForAuth, adminServices.createAMovie);
router.put(`/movies/:id`, checkForAuth, adminServices.updateAMovie);
router.delete(`/movies/:id`, adminServices.deleteAMovie);

//TvShows
router.get(`/tvShows`, tvShowServices.getAllTvShows);
router.get(`/tvShows/:id`, tvShowServices.getASpecificTvShow);
router.post(`/tvShows/`, dataValidation.validateIncomingData, checkForAuth, adminServices.createATvShow);
router.put(`/tvShows/:id`, checkForAuth, adminServices.updateTVShow);
router.delete(`/tvShows/:id`, checkForAuth, adminServices.deleteATvShow);

//Users
router.get(`/user`,  userServices.displayAllUsers);
router.post(`/user/`, userServices.createAUser);
router.put(`/user/:id`, checkForAuth, userServices.updateUser);
router.delete(`/user/:id`, checkForAuth, userServices.deleteUser);

//Postman Clean Up 
router.delete(`/movies/deleteTitle/:title`, checkForAuth, adminServices.deleteAllMoviesByTitle);
router.delete(`/tvShows/deleteTitle/:title`, checkForAuth, adminServices.deleteAllTVShowsByTitle);

module.exports = router;