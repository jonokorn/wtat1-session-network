const path = require('path')

// Get Indexpage -> GET
const getIndexPage = async (req,res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
}

// Get Aboutpage -> GET
const getAboutPage = async (req,res) => {
    res.sendFile(path.join(__dirname, '../views', 'about.html'));
}

module.exports = {
    getIndexPage,
    getAboutPage
}