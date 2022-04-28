const express = require('express')
const router  = express.Router()
const { getPost, setPost, updatePost, deletePost } = require('../controllers/postController')

router.get('/', getPost)

router.post('/', setPost) 

router.put('/:id', updatePost) 
 
router.delete('/:id', deletePost) 


module.exports =router