const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");


const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.status(500).json({msg : "every credential is required"});
    }

    const userAvailable = req.body.findOne({username})

    if (userAvailable) {
        res.status(400).json({msg : "user already registered"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username : username,
        email : email,
        password : hashedPassword
    })
     

    if (user) {
        res.status(201).json({_id : user.id, email : user.email} )
    }else {
        res.status(400).json({msg : "user not created"})
    }
    res.status(400).json({msg : "register user now"});
})


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body; 

    const passwordChecked = await bcrypt.compare(password, hashedPassword)

    if (email && passwordChecked) {
        res.status(400).json({
            msg : "Incorrect credentials"
        })
        
       const accessToken = jwt.sign({
            username : username,
            password : password
        }, process.env.SECRET_TOKEN, {expires : "15m"})

        res.status(200).json({
            accessToken
         })
    } else {
        res.status(400).json({
            msg : "not verified"
        })
    }


})


const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


module.exports = {registerUser, loginUser, currentUser}





