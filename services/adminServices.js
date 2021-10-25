const { v4: uuidv4 } = require('uuid'); // Uniquely identifies Pics
// const AWS = require('aws-sdk');


const movieModel = require("../models/movieModel.js")
const tvShowModel = require("../models/tvShowModel.js")

/************************************
        CREATE A MOVIE - this needs ADMIN Log IN Validation Fix!!
************************************/
exports.createAMovie = (req,res) => {

    // console.log(req.body)
    // console.log(req.files)

    const movieData = new movieModel(req.body); //Json
    movieData.files = req.files // Send to Pre MW
    movieData.save() //Returns Promise
    .then(movie => {

        console.log(movie)

            res.status(201).json({
            message : `A new movie was successfully CREATED`,
            data : movie

            })

    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })
    })

};    
    
    /************************************
            DELETE A MOVIE BASED ON ID - this needs ADMIN Log IN Validation Fix!!
    ************************************/
    exports.deleteAMovie = (req,res)=>{
    
        const movieID = req.params.id
       
        movieModel.findOneAndDelete({ _id: `${movieID}`}) 
        .then(movie => {
            if(movie)
            {
                res.status(200).json({
                    message :`Movie with the ID: ${movieID} and Title: ${movie.title} was DELETED successfully`
                })
            }
            else
            {
                res.status(404).json({
                    message : `Movie ${movieID} was not found`
                })
            }
        })
        .catch(err => {
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        }) 
    };
         
    
    
    /************************************
            FIND && UPDATE A MOVIE BASED ON ID - this needs ADMIN Log IN Validation Fix!!
    ************************************/
    exports.updateAMovie = (req,res) => {
    
        const updatedData = req.body;
        const IDidentifier = req.params.id;
    
        // condition - how to find user
        // define replacement data
        // default passes old data 
    
        movieModel.findOneAndUpdate({ _id: IDidentifier}, updatedData, {new:true})
        .then(movie => {
    
            if(movie)
            {
                res.status(200).json({
                    message : `Movie with the ID: ${IDidentifier} and Title: ${movie.title} was UPDATED successfully`,
                    data : movie
                })
            }
            else
            {
                res.status(404).json({
                    message : `Movie with the ID: ${IDidentifier} not found`
                })
            }
        })
        .catch(err => {
    
            res.status(500).json({
                message : `Error  ${err}`
            })
        }) 
    };
    
    
    
    /************************************
            GET A SPECIFIC A MOVIE BASED ON ID
    ************************************/
    exports.getASpecificMovie = (req,res) => {
       
        const movieID = req.params.id
     
        movieModel.findOne({ _id: `${movieID}`}) 
        .then( movie => {
    
            if(movie)
            {
                res.status(200).json({
                    message : `SPECIFIC Movie Details of ${movieID} with the Title: ${movie.title} `,
                    data : movie
                })
            }
            else
            {
                res.status(404).json({
                    message : `Item  with name : ${movieID} not found`
                })
            }
        })
        .catch(err => {
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        }) 
    
    };
    
/* ************************************************************************************************************************** */
    

    
/************************************
        CREATE A TV SHOW - this needs ADMIN Log IN Validation Fix!!
************************************/
exports.createATvShow = (req,res) => {

    console.log(req.body)
    console.log(req.files)

  
    const tvShowData = new tvShowModel(req.body);
    tvShowData.files = req.files // Send to Pre MW
    tvShowData.save() //Returns Promise
    .then(show => {

        console.log(show)

        res.status(201).json({
            message : `A new Tv Show was successfully CREATED`,
            total : show.length,
            data : show
    })
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })
    })

};


/************************************
        DELETE A MOVIE BASED ON ID - this needs ADMIN Log IN Validation Fix!!
************************************/
exports.deleteATvShow = (req,res)=>{

    const tvShowID = req.params.id
   
    tvShowModel.findOneAndDelete({ _id: `${tvShowID}`}) 
    .then(show => {
        if(show)
        {
            res.status(200).json({
                message :`Movie with the ID: ${tvShowID} and Title: ${show.title} was DELETED successfully`

            })
        }
        else
        {
            res.status(404).json({
                message : `Movie ${tvShowID} was not found`
            })
        }
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })

    }) 
};


/************************************
        FIND && UPDATE A TV SHOW BASED ON ID - this needs ADMIN Log IN Validation Fix!!
************************************/
exports.updateTVShow = (req,res) => {

    const updatedData = req.body;
    const IDidentifier = req.params.id;

    // condition - how to find user
    // define replacement data
    // default passes old data 

    tvShowModel.findOneAndUpdate({ _id: IDidentifier}, updatedData, {new:true})
    .then(show => {

        if(show)
        {
            res.status(200).json({
                message : `TV Show with the ID: ${IDidentifier} and Title: ${show.title} was UPDATED successfully`,
                data : show
            })
        }
        else
        {
            res.status(404).json({
                message : `TV Show with the ID: ${IDidentifier} not found`
            })
        }
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })
    }) 
};


/************************************
        GET A SPECIFIC A MOVIE BASED ON ID
************************************/
exports.getASpecificTvShow = (req,res) => {
   
    const TvShowID = req.params.id
 
    tvShowModel.findOne({ _id: `${TvShowID}`}) 
    .then(show => {

        if(show)
        {
            res.status(200).json({
                message : `SPECIFIC Movie Details of ${TvShowID} with the Title: ${show.title} `,
                data : show
            })
        }
        else
        {
            res.status(404).json({
                message : `Item  with name : ${TvShowID} not found`
            })
        }
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })

    }) 

};

/*******************************************************
*******************************************************
    QUICK ADMIN ROUTES FOR DB CLEANUP
*******************************************************
*******************************************************/

/************************************
DELETE A MOVIE BASED ON TITLE - POSTMAN QUICK CLEAN UP
************************************/
exports.deleteAllMoviesByTitle = (req,res)=>{

    const movieID = req.params.title
    
    movieModel.findOneAndDelete({ title: `${movieID}`}) 
    .then(movie => {
        if(movie)
        {
            res.status(200).json({
                message :`Movie with the ID: ${movieID} and Title: ${movie.title} was DELETED successfully`
            })
        }
        else
        {
            res.status(404).json({
                message : `Movie ${movieID} was not found`
            })
        }
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })

    }) 
};

/************************************
        DELETE A TV SHows BASED ON TITLE - POSTMAN QUICK CLEAN UP
************************************/
exports.deleteAllTVShowsByTitle = (req,res)=>{

    const movieID = req.params.title
    
    tvShowModel.findOneAndDelete({ title: `${movieID}`}) 
    .then(movie => {
        if(movie)
        {
            res.status(200).json({
                message :`Movie with the ID: ${movieID} and Title: ${movie.title} was DELETED successfully`
            })
        }
        else
        {
            res.status(404).json({
                message : `TV ${movieID} was not found`
            })
        }
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })

    }) 
};
        