const { v4: uuidv4 } = require('uuid'); // Uniquely identifies Pics

const movieModel = require("../models/movieModel.js")

// Get All the Movies
exports.getAllMovies = (req, res) => {

    movieModel.find()
    .then(movies => {

        res.status(200).json({

            message : `List of all movies`,
            total : movies.length,
            results : movies

        })
    })
    .catch(err => {

        res.status(500).json({

            message : `Error  ${err}`
        })

    })    

};

// Creating a Movie
exports.createAMovie = (req,res)=>{
   
    const newMovieData  = req.body

    const movie = new movieModel(newMovieData);
        movie.save()
        .then(movie => {

            res.status(201).json({
                message : `A new movie was successfully created`,
                results : movie
        })

        })
        .catch(err => {

            res.status(500).json({
                message : `Error  ${err}`
            })

        })


};

