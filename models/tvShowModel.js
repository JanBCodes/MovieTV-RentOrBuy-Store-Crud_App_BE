const mongoose = require('mongoose');
const { Schema } = mongoose;

const tvShowSchema = new Schema({


    title:
    {
        type: String,
        required: true
    },

    synopsis:
    {
        type: String,
        required: true
    },

    trailer:
    {
        type: String,
        required: false
    },

    releaseDate:
    {
        type: Date,
        required: true
    },

    genre:
    {
        type: String,
        required: true
    },

    rating:
    {
        type: Number,
        required: true
    },

    userScore:
    {
        type: Number,
        required: true
    },

    numOfSeasons:
    {
        type: Number,
        required: true
    },

    smallPosterImg:
    {
        type: String,
        default: "default.jpg"
    },

    largePosterImg:
    {
        type: String,
        default: "default.jpg"
    },

    priceToRent:
    {
        type: Number,
        required: true
    },

    priceToBuy:
    {
        type: Number,
        required: true
    },

    featured:
    {
        type: Boolean,
        required: true
    },

    dateCreated:
    {
        type: Date,
        default:Date.now()
    }
    
    

});

const tvShowModel = mongoose.model('tvshow', tvShowSchema);

module.exports = tvShowModel;

// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
// Map
// Schema