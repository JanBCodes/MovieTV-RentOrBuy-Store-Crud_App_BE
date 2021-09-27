const express = require("express");
const router = express.Router();

const tvShowServices = require("../services/tvShowServices.js")
// const dataValidation = require("../middleware/validation.js")


router.get(`/`, tvShowServices.getAllTvShows);
router.get(`/:id`, tvShowServices.getASpecificTvShow);
// router.post(`/`, tvShowServices.createATvShow);
// router.put(`/:id`, tvShowServices.updateTVShow);
// router.delete(`/:id`, tvShowServices.deleteATvShow);

router.post(`/search`, tvShowServices.searchTvShow);

module.exports = router;
