const asyncHandler = require('express-async-handler')

// Get Post -> GET /api/posts
const getPost = asyncHandler(async(req,res) => {
    res.status(200).json({
        message: 'Get Post'
    })
})
// Set Post -> POST /api/posts
const setPost = asyncHandler(async(req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }
    res.status(200).json({
        message: `Set Post`
    })
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

