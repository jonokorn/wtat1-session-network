const express        = require('express')
const router         = express.Router()
const {getIndexPage, getAboutPage,getTestPage} = require('../controllers/homeController')

router.get('/', getIndexPage)

router.get('/about', getAboutPage)

router.get('/test/:name', getTestPage)

module.exports = router