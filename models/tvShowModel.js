const mongoose = require('mongoose');
const { Schema } = mongoose;

const tvShowSchema = new Schema({

    title:
    {
        type: String,
        required: true
    },

    type:
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
        required: true
    },

    releaseDate: //Y,M.D
    {
        type: Date,
        required: true
    },

    genre:
    {
        type: Array, //Check Boxes
        default: "Other",
        required: true
    },

    rating: // MPA: G, PG, PG-13, R, NC-17
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

    isFeatured: // Drop Down List or Checked Box
    {
        type: Boolean,
        default: true,
        required: true
    },

    isNewRelease: // Drop Down List or Checked Box
    {
        type: Boolean,
        default: true,
        required: true
    },

    dateCreated:
    {
        type: Date,
        default:Date.now()
    }
    
});

const tvShowModel = mongoose.model('TvShow', tvShowSchema);

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