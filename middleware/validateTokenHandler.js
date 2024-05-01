const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");



const validateToken = asyncHandler(async (req, res) => {


    const authHeader = req.Headers.Authorisation

    if (authHeader) {
        const token = authHeader.split(" ")[1]

        const verified = jwt.verify(token, process.env.SECRET_TOKEN , (err, decoded) => {
            if (err) {
                res.status(400).json({
                    msg : "invalid token"
                })
            }

                req.user = decoded.user;
                next();
        
        });

        if (!token) {
            res.status(400).json({
                msg : "user is not authorised"
            })
        }

    }
})

module.exports = validateToken;