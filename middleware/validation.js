exports.validateIncomingTextData = (req,res,next)=>{

    console.log(req.body);

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
        errors.push("Sorry, Trailer Link cannot be blank")
    }

    if(req.body.userScore === "")
    {
        errors.push("Sorry, Trailer Link cannot be blank")
    }

    if(req.body.runtime === "")
    {
        errors.push("Sorry, Trailer Link cannot be blank")
    }

    if(req.body.priceToRent === "")
    {
        errors.push("Sorry, Trailer Link cannot be blank")
    }

    if(req.body.priceToBuy === "")
    {
        errors.push("Sorry, Trailer Link cannot be blank")
    }

    // if(req.body.smallPosterImg === "")
    // {
    //     errors.push("Sorry, Trailer Link cannot be blank")
    // }

    // if(req.body.largePosterImg === "")
    // {
    //     errors.push("Sorry, Trailer Link cannot be blank")
    // }

    if(errors.length == 0)
    {
        next();
    }
    else
    {
        res.status(400).json({
            message: "Oops there are some errors with your entry, please fix. ",
            errors
        })
    }
   
}