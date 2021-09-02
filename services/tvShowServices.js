const tvShowModel = require("../models/tvShowModel.js")

exports.getAllTvShows = (req, res) => {

    tvShowModel.find()
    .then(shows => {

        res.status(200).json({

            message : `List of all TV shows`,
            total : shows.length,
            results : shows

        })
    })
    .catch(err => {

        res.status(500).json({

            message : `Error  ${err}`
        })

    })    

};
