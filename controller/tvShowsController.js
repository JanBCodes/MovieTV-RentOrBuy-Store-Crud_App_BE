const express = require("express");
const router = express.Router();

const tvShowServices = require("../services/tvShowServices.js")

router.get(`/`, tvShowServices.getAllTvShows);


// router.get(`/:name`, (req,res)=>{});
// router.post(`/`, (req,res)=>{});
// router.put(`/:name`, (req,res)=>{});
// router.delete(`/:name`, (req,res)=>{});

module.exports = router;