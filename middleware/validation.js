exports.validateIncomingTextData = (req,res,next)=>{

    const errors = [];

    if(req.body.title === "")
    {
        errors.push("Sorry, Title cannot be blank")
    }

    if(req.body.synopsis === "")
    {
        errors.push("Sorry, Synopsis cannot be blank")
    }

    if(req.body.trailer === "")
    {
        errors.push("Sorry, Trailer Link cannot be blank")
    }

    if(req.body.releaseDate === "")
    {
        errors.push("Sorry, Release Date Link cannot be blank")
    }

    if(req.body.genre === "")
    {
        errors.push("Sorry, Genre cannot be blank")
    }

    if(req.body.rating === "")
    {
        errors.push("Sorry, Rating cannot be blank")
    }

    if(req.body.userScore === "")
    {
        errors.push("Sorry, User Score cannot be blank")
    }

    if(req.body.runtime === "")
    {
        errors.push("Sorry, Runtime cannot be blank")
    }

    if(req.body.priceToRent === "")
    {
        errors.push("Sorry, Rental Price cannot be blank")
    }

    if(req.body.priceToBuy === "")
    {
        errors.push("Sorry, Purchase Price cannot be blank")
    }

/*     
    console.log(req.files) = null

    if(req.files.smallPosterImg.mimetype.includes("image"))
    {
        errors.push("Please Upload an IMAGE")
    }

    if(req.files.largePosterImg.mimetype.includes("image"))

    {
        errors.push("Please Upload an IMAGE")
    } 
*/


    if(errors.length == 0)
    {
        next();
    }
    else
    {
        res.status(400).json({
            message: "Please enter the correct information. ",
            errors
        })
    }
   
}