const asyncHandler = require('express-async-handler')
const bcrypt       = require('bcryptjs')
const jwt          = require('jsonwebtoken')
const User         = require('../models/userModel')




//===== Create new User -> 
const registerUser = asyncHandler(async(req,res) => {
    const {username,password} = req.body

    if(!username || !password) {
        res.status(400)
        throw new Error('Email or Password not provided!')
    }

    const userAlreadyExists = await User.findOne({username})
    // Check if Username is already taken
    if(userAlreadyExists) {
        res.status(400)
        throw new Error('Username already taken!');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    // Create User
    const user = await User.create({
        username,
        password:hash
    })

    if(user){
        res.status(201)
        res.json({
            _id : user.id,
            username: user.username,
            password: user.password,
            token: generateJWT(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Registration failed')
    }
})


//===== Login User -> Post /users
const loginUser = asyncHandler(async(req,res) => {
    const {username,password} = req.body

    const user = await User.findOne({username})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: generateJWT(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Username or password not correct')
    }
})

//===== Get User -> GET /users
const getUser = asyncHandler(async(req,res) => {

})

//===== Generate Jason Web Token
const generateJWT = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'14d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}