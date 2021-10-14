const jwt = require("jsonwebtoken");

exports.checkForAuth= (req,res,next)=>{

    const token = req.header("X-JWT_AuthHeader-X");

    if(!token) //No Key Found
    {
        res.status(401).json({
            message : `Access denied. Request is missing token`
        })
    }
           
    else  //The req has a HEADER with the key: X-JWT_AuthHeader-X
    {
        try //The requests contains a valid token with a VALID signature
        {            
            jwt.verify(token,process.env.JWT_SECRET);

            next(); // proceed to the NEXT middleware Fn
        }
        catch(err)
        {
            res.status(401).json({
                message : `Access denied. Invalid Token. Authentication failed!`,
                error: err
            })

        }

    }
}