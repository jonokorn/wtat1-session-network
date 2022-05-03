const asyncHandler = require('express-async-handler')
const Post         = require('../models/postModel')


// Get Post -> GET /api/posts
const getPost = asyncHandler(async(req,res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})

// Set Post -> POST /api/posts
const setPost = asyncHandler(async(req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }

    const post = await Post.create({
        text: req.body.text
    })

    res.status(200).json(post)
})

const updatePost = asyncHandler((req,res) => {
    res.status(200).json({
        message: `Update Post ${req.params.id}`
    })
})

const deletePost = asyncHandler((req,res) => {
    res.status(200).json({
        message: `Delete Post ${req.params.id}` 
    })
})


module.exports = {
    getPost,
    setPost,
    updatePost,
    deletePost
}

