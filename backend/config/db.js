const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected to: ${conn.connection.host}`.yellow)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectToDatabase