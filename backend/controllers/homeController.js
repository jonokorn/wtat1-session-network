const path = require('path')


const getIndexPage = async (req,res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
}

const getAboutPage = async (req,res) => {
    res.sendFile(path.join(__dirname, '../views', 'about.html'));
}

const getTestPage = async (req,res) => {
    let name = req.params.name
    res.render(path.join(__dirname, '../views', 'index'),{name:name});
}

module.exports = {
    getIndexPage,
    getAboutPage,
    getTestPage,
}