const express           = require('express')
const dotenv            = require('dotenv').config()
const port              = process.env.PORT || 6000
const colors            = require('colors')
const {errorHandler}    = require('./middleware/errorMiddleware')
const connectToDatabase = require('./config/db')

const app               = express()

connectToDatabase()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/posts', require('./routes/postRoutes'))

app.use('/', require('./routes/indexRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
