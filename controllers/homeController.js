const path = require('path');
const mongoose = require("mongoose");
const event = require("../models/events")






const reloadEvents = () => {
    var allEvents = event.find()
    allEvents.exec((error, data) => {
        if (error){
            console.log("An error occured while getting the data from the database")
            console.log(error)
        } 
        if(data){
            console.log(data)
            events = data;
        }
    })
}

var events;
reloadEvents();



getEventsPage = (req, res) => {
    reloadEvents();
    setTimeout(
        res.render("events", {
            nextEvents: events
        })
    , 200)
 
    console.log("got eventsPage")
}   

getHomePage = (req, res) => {
    res.render("index")
};

getRegisterPage = (req, res) => {
    res.render("register")
};

getContactPage = (req, res) => {
    res.render("contact")
};



getRegisterDonePage = (req, res) => {
    let formName = req.body.name;
    res.render("registerDone", {name: formName})
};

respondWithName = (req, res) => {
    let paramsName = req.params.name;
    res.render("name", {name: paramsName});
};

module.exports = {

    indexView: (req, res) => {
        res.render("./index.ejs");
    },

    chat: (req, res) => {
        res.render("chat");
    },
    
    getHomePage,
    getContactPage,
    respondWithName,
    getRegisterPage,
    getRegisterDonePage,
    getEventsPage,
    reloadEvents
}