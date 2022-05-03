const asyncHandler = require('express-async-handler')
const Post         = require('../models/postModel')


//===== Fetch all Posts -> GET /posts
const getPost = asyncHandler(async(req,res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})


//===== Set Post -> POST /posts
const setPost = asyncHandler(async(req,res) => {

    if(!req.body.title) {
        res.status(400)
        throw new Error('Title can not be empty')
    }

    if(!req.body.text) {
        res.status(400)
        throw new Error('Text can not be empty')
    }

    const post = await Post.create({
        title: req.body.title,
        text: req.body.text,
    })

    res.status(200).json(post)
})


//===== Update Post -> PUT /posts:id 
const updatePost = asyncHandler(async(req,res) => {

    const post = await Post.findById(req.params.id)

    if(!post){
        res.status(400)
        throw new Error(`No Post found with the id ${req.params.id}`)
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id,req.body, {new: true})

    res.status(200).json(updatedPost)
})

//===== Delete Post -> DELETE /posts:id
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