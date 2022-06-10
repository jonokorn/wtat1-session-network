const event = require("../models/events")
const homeController = require("./homeController")

const postContact = ("/contact", (req, res) =>{
    console.log(req.body);
    console.log(req.query);
    res.send("Thanks for sharing your ");
});

const createEvent = ("/events" ,(req,res) => {
    console.log("create Event " + req.body.name);
    try{
        event.create({
            name: req.body.name,
            location: req.body.location,
            location_name: req.body.location_name,
            price: req.body.price,
            date: req.body.date
        })
        console.log("event createdd")
    }
    catch(error){
        console.log("An Error with creating the event occured")
        console.log(error)
    }
    homeController.reloadEvents();
    res.redirect('back')
    
});

module.exports = {
    postContact,
    createEvent
}