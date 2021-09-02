const express = require("express");
const router = express.Router();

const movieServices = require("../services/movieServices.js")

router.get(`/`, movieServices.getAllMovies);
// router.get(`/:name`, (req,res)=>{});
router.post(`/`, movieServices.createAMovie);
// router.put(`/:name`, (req,res)=>{});
// router.delete(`/:name`, (req,res)=>{});

module.exports = router;