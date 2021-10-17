exports.validateIncomingData = (req,res,next)=>{

    const errors = [];

    if(req.body.title === "")
    {
        errors.push("Sorry, Title cannot be blank")
    }

    if(req.body.type === "")
    {
        errors.push("Sorry, Type cannot be blank")
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

    if(req.body.rating > 5 || req.body.rating < 0)
    {
        errors.push("Sorry, Rating must be between 0 & 5")
    }

    if(req.body.userScore === "")
    {
        errors.push("Sorry, User Score cannot be blank")
    }

    if(req.body.userScore > 10 || req.body.userScore < 0)
    {
        errors.push("Sorry, User Score must be between 0 & 10")
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

