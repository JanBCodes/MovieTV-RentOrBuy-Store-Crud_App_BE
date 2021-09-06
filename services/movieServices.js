// const { v4: uuidv4 } = require('uuid'); // Uniquely identifies Pics

const movieModel = require("../models/movieModel.js")


// exports.getAllMovies = (req, res) => {

//     movieModel.find()
//     .then(movies => {

//         res.status(200).json({

//             message : `List of all movies (READ)`,
//             total : movies.length,
//             results : movies

//         })
//     })
//     .catch(err => {

//         res.status(500).json({

//             message : `Error  ${err}`
//         })

//     })    

// };

/************************************
        GET ALL MOVIES  && QUERY STRINGS 
************************************/
exports.getAllMovies = (req,res)=>{

    if(req.query.feat)
    {
        movieModel.find({isFeatured : req.query.feat}) 
        .then(movies=>{
    
            res.json({
                message : `All FEATURED Movies = ${req.query.feat}`,
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

    else if(req.query.isNew)
    {
       
        let status;
        const value = req.query.isNew;

        console.log(value)

        if(value === 'y')
        {
            status = true
        }

        else
        {
            status = false
        }
       
        console.log(status)


        movieModel.find({isNewRelease : status})  
        .then(movies=>{
    
            res.json({
                message : `List of all NEW MOVIE RELEASES `,
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
        .then(movie=>{
    
            res.json({
                message : `List of all ALL MOVIES`,
                total: movie.length,
                data : movie,
                total: movie.length
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
        CREATE A MOVIE
************************************/
exports.createAMovie = (req,res) => {
   
    const newMovieData  = req.body

    console.log(newMovieData) 
                
    
/************** Validation to be added (For duplicate) **************/
  
        const movie = new movieModel(newMovieData);
        movie.save()
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
};


/************************************
        DELETE A MOVIE BASED ON ID
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
        FIND && UPDATE A MOVIE BASED ON ID
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

// exports.getByTitles = (req,res)=>{

//     if(req.query.title)
//     {
//         //Get an array of documents
//         itemModel.find({title:req.query.title}) //.find() returns a promise (asynchronous code)

//         .then((movie)=>{
//             res.json({
//                 message: `Sort by Title type: ${req.query.title}`,
//                 data:items,
//                 total:items.length
//             })

//         })
//         .catch((err)=>{
    
//             res.status(500).json({
//                 message: `Error occured ${err}`
//             })
//         })

//     }
//     else
//     {
//         itemModel.find() //.find() returns a promise (asynchronous code)

//         .then((items)=>{
//             res.json({
//                 message: "A list of items in the game",
//                 data:items,
//                 total:items.length
//             })

//         })
//         .catch((err)=>{
        
//             res.status(500).json({
//                 message: `Error occured ${err}`
//             })
//         })
//     }
    
// };












/* 
exports.searchMovie = (req,res) => {
   
    const searchInput = req.params.id

    console.log(searchInput)

    movieModel.aggregate()
    [
        {
          '$search': {
            'index': 'default_vudu', 
            'text': {
              'query': searchInput, 
              'path': {
                'wildcard': '*'
              }
            }
          }
        }
    ]

}


 */