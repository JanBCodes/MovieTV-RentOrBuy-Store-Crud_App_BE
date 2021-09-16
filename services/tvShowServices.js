const { v4: uuidv4 } = require('uuid'); // Uniquely identifies Pics

const tvShowModel = require("../models/tvShowModel.js")


/************************************
        GET TV SHOWS MOVIES  && QUERY STRINGS 
************************************/
exports.getAllTvShows = (req,res)=>{

    if(req.query.featTV)
    {
        tvShowModel.find({isFeatured : req.query.featTV}) // sort by Feat Movies
        .then(shows=>{
    
            res.json({
                message : `All FEATURED Tv Shows = ${req.query.featTV}`,
                total: shows.length,
                data : shows,
                total: shows.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
        })   
    }

    else if(req.query.isNewShow)  // sort by New TV Shows
    {
        let boolean;
        const value = req.query.isNewShow;

        if(value === 'y')
        {
            boolean = true
        }
        else
        {
            boolean = false
        }
       
        tvShowModel.find({isNewRelease : boolean})  
        .then(shows=>{
    
            res.json({
                message : `List of all NEW TV RELEASES (${boolean})`,
                total: shows.length,
                data : shows,
                total: shows.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }

    else if(req.query.tvRelDate)   // SORT by Release Date // movies?relDate=asc  // DATE DATA TYPE //Y,M.D **************
    {
        let relDate = req.query.tvRelDate
        let sortBy;

        if(relDate === `asc`)
        { 
            sortBy = 1  //sort acending order
        }
        else if(relDate === `des`)
        {
            sortBy = -1 //sort by decending order
        }

        tvShowModel.find().sort({releaseDate: sortBy})
        .then(shows=>{
                res.json({
                message : `List of all TV Shows by RELEASE DATE (${relDate} order) `,
                total: shows.length,
                data : shows,
                total: shows.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
        })   
    }

    else if(req.query.tvGenre)   // sort by GENRE DATA TYPE - ARRAY
    {
        let tvGenre = req.query.tvGenre

        tvShowModel.find( { genre: { $all: [tvGenre] } } )
        .then(shows=>{
    
            res.json({
                message : `List of all Tv Shows by GENRE (${tvGenre})`,
                total: shows.length,
                data : shows,
                total: shows.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
        })   
    }

    else if(req.query.tvRate)   // sort by RATING
    {
        let tvRate = req.query.tvRate
        let sortBy;

        if(tvRate === `asc`)
        { 
            sortBy = 1  //sort acending order
        }
        else if(tvRate === `des`)
        {
            sortBy = -1 //sort by decending order
        }

        tvShowModel.find().sort({rating: sortBy})
        .then(shows=>{
    
            res.json({
                message : `List of all TV Shows by RATING (${tvRate} order)`,
                total: shows.length,
                data : shows,
                total: shows.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }

    else if(req.query.tvScore)   // sort by Movie User Score
    {
        let tvScore = req.query.tvScore;
        let sortBy;

        if(tvScore === `asc`)
        { 
            sortBy = 1  //sort acending order
        }
        else if(tvScore === `des`)
        {
            sortBy = -1 //sort by decending order
        }

        tvShowModel.find().sort({userScore: sortBy})
        .then(shows=>{
    
            res.json({
                message : `List of all TV Shows by USER SCORE (${tvScore} order)`,
                total: shows.length,
                data : shows,
                total: shows.length
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
    }
    
};


/************************************
        CREATE A TV SHOW - this needs ADMIN Log IN Validation Fix!!
************************************/
exports.createATvShow = (req,res) => {
  
    const newTVData  = req.body

    const tvShow = new tvShowModel(newTVData);

    tvShow.save() //Returns Promise
    .then(show => {

        res.status(201).json({
            message : `A new Tv Show was successfully CREATED`,
            results : show
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
                results : show
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


/************************************
    SEARCH BAR
************************************/
exports.searchTvShow = (req,res) => {
   
    const searchInput = req.body.search

        tvShowModel.aggregate(
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
        .then((tvShow)=>{

            if(tvShow.length === 0)
            {
                res.json({
                    message: `No Matches for ${searchInput}`
                })
                }
            else
            {   
                res.json({
                    message: `Search Results of : ${searchInput}`,
                    results:tvShow.length,
                    data:tvShow
                })
            }
        })
        .catch((err)=>{
        
            res.status(500).json({
                message: `Error occured ${err}`
            })
        })

};
