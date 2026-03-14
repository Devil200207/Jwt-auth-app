function authMiddleware(req,res,next){
    const token = req.headers.token;

    if(!token)
    {
        res.status(400).send({
            message:"you are not authenticated"
        })
    }

    const decoded = jwt.verify(token,sectret);
    const username = decoded.username;

    if(!username)
    {
        res.status(401).send({
            message:"User not found"
        })
    }

    req.username = username;

    next();
}

module.exports = {authMiddleware};