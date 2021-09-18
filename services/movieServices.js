const { v4: uuidv4 } = require('uuid'); // Uniquely identifies Pics

const movieModel = require("../models/movieModel.js")

/************************************
        GET ALL MOVIES 
************************************/

/* exports.getAllMovies = (req, res) => {

    movieModel.find()
    .then(movies => {

        res.status(200).json({

            message : `List of all movies (READ)`,
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
 */
/************************************
        GET ALL MOVIES  && QUERY STRINGS 
************************************/
exports.getAllMovies = (req,res)=>{

    if(req.query.featMovie)
    {
        movieModel.find({isFeatured : req.query.featMovie}) // sort by Feat Movies
        .then(movies=>{
    
            res.json({
                message : `All FEATURED Movies = ${req.query.featMovie}`,
                total: movies.length,
                data : movies,
                total: movies.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
        })   
    }

    else if(req.query.isNewMovie)  // sort by New Movies
    {
        let boolean;
        const value = req.query.isNewMovie;

        if(value === 'y')
        {
            boolean = true
        }
        else
        {
            boolean = false
        }
       
        movieModel.find({isNewRelease : boolean})  
        .then(movies=>{
    
            res.json({
                message : `List of all NEW MOVIE RELEASES (${boolean})`,
                total: movies.length,
                data : movies,
                total: movies.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }

    else if(req.query.movieRelDate)   // SORT by Release Date // movies?relDate=asc  // DATE DATA TYPE //Y,M.D **************
    {
        let relDate = req.query.movieRelDate
        let sortBy;

        if(relDate === `asc`)
        { 
            sortBy = 1  //sort acending order
        }
        else if(relDate === `des`)
        {
            sortBy = -1 //sort by decending order
        }

        movieModel.find().sort({releaseDate: sortBy})
        .then(movies=>{
                res.json({
                message : `List of all Movies by RELEASE DATE (${relDate} order) `,
                total: movies.length,
                data : movies,
                total: movies.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }

    else if(req.query.movieGenre)   // sort by GENRE DATA TYPE - ARRAY
    {
        let movieGenre = req.query.movieGenre

        movieModel.find( { genre: { $all: [movieGenre] } } )
        .then(movies=>{
    
            res.json({
                message : `List of all Movies by GENRE (${movieGenre})`,
                total: movies.length,
                data : movies,
                total: movies.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }

    else if(req.query.movieRate)   // sort by RATING
    {
        let movieRate = req.query.movieRate
        let sortBy;

        if(movieRate === `asc`)
        { 
            sortBy = 1  //sort acending order
        }
        else if(movieRate === `des`)
        {
            sortBy = -1 //sort by decending order
        }

        movieModel.find().sort({rating: sortBy})
        .then(movies=>{
    
            res.json({
                message : `List of all Movies by RATING (${movieRate} order)`,
                total: movies.length,
                data : movies,
                total: movies.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }

    else if(req.query.movieUserScore)   // sort by Movie User Score
    {
        let movieUserScore = req.query.movieUserScore;
        let sortBy;

        if(movieUserScore === `asc`)
        { 
            sortBy = 1  //sort acending order
        }
        else if(movieUserScore === `des`)
        {
            sortBy = -1 //sort by decending order
        }

        movieModel.find().sort({userScore: sortBy})
        .then(movies=>{
    
            res.json({
                message : `List of all Movies by USER SCORE (${movieUserScore} order)`,
                total: movies.length,
                data : movies,
                total: movies.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
        })   
    }

    else
    {
        movieModel.find()
        .then(movies=>{
    
            res.json({
                message : `List of all ALL MOVIES`,
                total: movies.length,
                data : movies,
                total: movies.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }
  
};


/************************************
        CREATE A MOVIE - this needs ADMIN Log IN Validation Fix!!
************************************/
exports.createAMovie = (req,res) => {

/*     // let absoluteAddressSM;
    // let absoluteAddressBG;
    // let smallPosterImg;
    // let largePosterImg;
    */
    const newMovieData  = req.body

    const movie = new movieModel(newMovieData);

    movie.save() //Returns Promise
    .then(movie => {

        res.status(201).json({
            message : `A new movie was successfully CREATED`,
            results : movie
        })
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })
    })

    

    // console.log(req.files) // if NULL no UPLOADs

    // if(req.files === null) // 
    // {

    // }    
    // else
    // {

    //     smallPosterImg = req.files.smallPosterImg.mimetype //?? if undefined : Throws Error Fix!
    //     largePosterImg = req.files.largePosterImg.mimetype //?? if undefined : Throws Error



    // }

    //     // smallPosterImg = req.files.smallPosterImg.mimetype //?? if undefined : Throws Error Fix!
    //     // largePosterImg = req.files.largePosterImg.mimetype //?? if undefined : Throws Error

    // /************** Validation of IMAGE TYPE for UpLoad **************/

    // if(smallPosterImg.includes("image")) //return true/false
    // {        
    //     const uuid = uuidv4();
    //     const smallPosterImgUP = req.files.smallPosterImg.name
    //     const uuidPicNameforSM = `${uuid}_${smallPosterImgUP}`
    //     absoluteAddressSM = `${process.cwd()}/assets/img/movieBannerSM/${uuidPicNameforSM}`
    //     newMovieData.smallPosterImg = uuidPicNameforSM
    // }
    
    // if (largePosterImg.includes("image") ) //return true/false
    // {
    //     const uuid = uuidv4();
    //     const largePosterImgUP = req.files.largePosterImg.name
    //     const uuidPicNameforBG = `${uuid}_${largePosterImgUP}`
    //     absoluteAddressBG = `${process.cwd()}/assets/img/movieBannerBIG/${uuidPicNameforBG}`
    //     newMovieData.largePosterImg = uuidPicNameforBG
    // }





    // if(absoluteAddressSM == undefined || absoluteAddressBG == undefined)
    // {
    //     res.status(404).json({
    //         message : `Please upload IMAGE Format or Leave Blank`
    //     })
    // }
    // else
    // {
    //     console.log(absoluteAddressSM)
    //     console.log(absoluteAddressBG)

    //         req.files.smallPosterImg.mv(absoluteAddressSM) // Returns Promise (can take CB fn)
    //         req.files.largePosterImg.mv(absoluteAddressBG) // Returns Promise (can take CB fn)
    //         .then(() => {
                
    //             const movie = new movieModel(newMovieData);

    //                 movie.save() //Returns Promise
    //                 .then(movie => {
            
    //                     res.status(201).json({
    //                         message : `A new movie was successfully CREATED`,
    //                         results : movie
    //                     })
    //                 })
    //                 .catch(err => {
            
    //                     res.status(500).json({
    //                         message : `Error  ${err}`
    //                     })
    //                 })
    
    //         })
    //         .catch(err => {

    //             res.status(500).json({
    //                 message : `Error  ${err}`
    //             })
    //         })
    //     }

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
                results : movie
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


/************************************
    SEARCH BAR
************************************/
exports.searchMovie = (req,res) => {
   
    const searchInput = req.body.search

        movieModel.aggregate(
        [
            {
            '$search': {
                'index': 'default_vudu',  //Cluster Name
                'text': {                  // Type Data
                'query': searchInput,   // Input Info to Query
                'path': { 
                    'wildcard': '*'    // Search All WILDCARD
                }
                }
            }
            }
        ])
        .then((movie)=>{

            if(movie.length === 0)
            {
                res.json({
                    message: `No Matches for ${searchInput}`
                })
                }
            else
            {   
                res.json({
                    message: `Search Results of : ${searchInput}`,
                    results:movie.length,
                    data:movie
                })
            }
        })
        .catch((err)=>{
        
            res.status(500).json({
                message: `Error occured ${err}`
            })
        })

};
