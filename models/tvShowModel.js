const mongoose = require('mongoose');
const { Schema } = mongoose;

const { v4: uuidv4 } = require('uuid'); // Uniquely identifies Pics
const AWS = require('aws-sdk');

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
        type: String,
        required: true
    },

    userScore: // 0 - 10
    {
        type: Array, //Check Boxes
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
        // required: true,
        default: "https://s3.us-east-2.amazonaws.com/s3.images.sample/default.jpg"
    },

    largePosterImg:
    {
        type: String, 
        default: "https://s3.us-east-2.amazonaws.com/s3.images.sample/default.jpg"
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




tvShowSchema.methods.intializeS3Bucket = function()  {

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey
    })

    return s3

}


tvShowSchema.pre('save', function(next){

    if(!this.files.smallPosterImg)
    {
        this.smallPosterImg

        next()


    } 
    else if(this.files.smallPosterImg.mimetype.includes("image"))
    {

        const s3 = this.intializeS3Bucket()
        const uuid = uuidv4();

        // Setting up S3 upload parameters
        const params = ({
            Bucket: process.env.BUCKET_NAME,
            Key: `${uuid}_${this.files.smallPosterImg.name}`, // File name you want to save as in S3
            Body: this.files.smallPosterImg.data // Buffer of Bytes
        })     

           s3.upload(params, (err, data) => {

            if (err) {
            throw err;
            }

            this.smallPosterImg = data.Location;

            next()

        })
    }
    else
    {
        this.smallPosterImg
        next()

    }

})



tvShowSchema.pre('save', function(next){

    if(!this.files.largePosterImg)
    {
        this.largePosterImg

        next()


    }
    else if(this.files.largePosterImg.mimetype.includes("image"))
    {
        const s3 = this.intializeS3Bucket()
        const uuid = uuidv4();

        // Setting up S3 upload parameters
        const params = ({
            Bucket: process.env.BUCKET_NAME,
            Key: `${uuid}_${this.files.largePosterImg.name}`, // File name you want to save as in S3
            Body: this.files.largePosterImg.data // Buffer of Bytes
        })     

        s3.upload(params, (err, data) => {

            if (err) {
            throw err;
            }

            this.largePosterImg = data.Location;

            next()

        })

    }
    else
    {
        this.largePosterImg
        next()

    }
    
})


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