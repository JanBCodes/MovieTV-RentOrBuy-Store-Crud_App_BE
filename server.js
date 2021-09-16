/* Importing Libraries */
const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config({ path: `config/keys.env`});
const fileUpload = require('express-fileupload');
const path = require('path');


/* Mapping the App Object to Express */
const app = express();


/* Importing Controllers */
const moviesController = require("./controller/movieController.js")
const tvShowsController = require("./controller/tvShowsController.js")
const adminController = require("./controller/adminController.js")


/* Mapping Json to Every CRUD Command */
app.use(express.json());


// app.use(cors({
//     origin: `${process.env.FE_CORS_ORIGIN}`
// }));


/* Direct Path to Static Assets */
app.use('/assets', express.static(path.join(__dirname, 'assets')))


/* Mapping File Upload to Every CRUD Command */
app.use(fileUpload()); // middleware for uploading files (False by default)


/* Mapping CRUD Command using express.Router */
// app.use("/", adminController)
app.use("/movies", moviesController);
app.use("/tvShows", tvShowsController);



/* Setting Up Web Server */
app.listen(process.env.PORT,()=>{

    console.log("Web Server Up and Running @PORT 3000")

    /* Connecting to MONGO DB */
    mongoose.connect(`${process.env.MONGODB_CONN_STRING}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(`MongoDb Connected`)
    })
    .catch(err => {
        console.log(`Error occurred : $${err}`)
    }) 

})




