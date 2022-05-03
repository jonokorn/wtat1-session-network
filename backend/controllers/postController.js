const asyncHandler = require('express-async-handler')
const Post         = require('../models/postModel')


// Get Post -> GET /posts
const getPost = asyncHandler(async(req,res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})

// Set Post -> POST /posts
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

// Update Post -> PUT /posts   
const updatePost = asyncHandler(async(req,res) => {

    const post = await Post.findById(req.params.id)

    if(!post){
        res.status(400)
        throw new Error(`No Post found with the id ${req.params.id}`)
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id,req.body, {new: true})

    res.status(200).json(updatedPost)
})

const deletePost = asyncHandler(async (req,res) => {

    const post = await Post.findById(req.params.id)

    if(!post){
        res.status(400)
        throw new Error(`No Post found with the id ${req.params.id}`)
    }

    await post.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getPost,
    setPost,
    updatePost,
    deletePost
}

