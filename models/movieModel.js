const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({

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

    runtime:
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

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;

