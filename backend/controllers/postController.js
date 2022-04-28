
// Get Post -> GET /api/posts
const getPost = async (req,res) => {
    res.status(200).json({
        message: 'Get Post'
    })
}
// Set Post -> POST /api/posts
const setPost = async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }
    res.status(200).json({
        message: `Set Post`
    })
}

const updatePost = async (req,res) => {
    res.status(200).json({
        message: `Update Post ${req.params.id}`
    })
}

const deletePost = async (req,res) => {
    res.status(200).json({
        message: `Delete Post ${req.params.id}` 
    })
}

module.exports = {
    getPost,
    setPost,
    updatePost,
    deletePost
} 