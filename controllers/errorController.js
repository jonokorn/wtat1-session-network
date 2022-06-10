const httpStatus = require("http-status-codes");

// If you want to customize your error pages, you can add a 404.html and a 500.html page
// in your public folder with basic HTML
// page 118 Lesson 11
respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {
    root: "./"
 });
};

respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is
    ➥experiencing a problem!`);
};


module.exports = {
    respondNoResourceFound,
    respondInternalError
}