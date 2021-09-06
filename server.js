/* Importing Libraries */
const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config({ path: `config/keys.env`});


/* Mapping the App Object to Express */
const app = express();


/* Importing Controller */
const moviesController = require("./controller/movieController.js")
const tvShowsController = require("./controller/tvShowsController.js")


/* Mapping Json to Every CRUD Command */
app.use(express.json());


/* Mapping CRUD Command using express.Router */

app.use("/movies", moviesController);
app.use("/tvShows", tvShowsController);


/* Setting Up Web Server */
app.listen(process.env.PORT,()=>{

    console.log("Web Server Up and Running @PORT 3000")

    mongoose.connect(`${process.env.MONGODB_CONN_STRING}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(`MongoDb Connected`)
    })
    .catch(err => {
        console.log(`Error occurred : $${err}`)
    }) 

})




