const express        = require('express')
const router         = express.Router()
const {getIndexPage, getAboutPage} = require('../controllers/homeController')

router.get('/', getIndexPage)

router.get('/about', getAboutPage)

module.exports = router