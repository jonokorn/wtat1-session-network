const { HTTP_VERSION_NOT_SUPPORTED } = require('http-status-codes');
const Events = require('../models/events');
const { respondWithName } = require('./homeController');
const  httpStatus = require("http-status-codes");


module.exports = {
    index: (req, res, next) => {
        Events.find()
             .then(events => {
                 res.locals.events = events;
                 next();
        })
        .catch(error => {
             console.log(`Error fetching events: ${error.message}`);
             next(error);
       });
     },
     
    indexView: (req, res) => {
         res.render("events/index");
    },

    respondJSON: (req, res) => {
        res.json(
                res.locals.events
            );
    },

    errorJSON: (error, req, res, next) => {
        let errorObject;
        
        if(error){
            errorObject = {
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
            };
        }else{
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown Error."
            };
        }

        res.json(errorObject);
    },

    new: (req, res) => {
        res.render("events/new");
    },
    create: (req, res, next) => {
        let eventParams = {
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        };

        Events.create(eventParams).then(event => {
            res.locals.redirect = "/events";
            res.locals.event = event;
            next();
        }).catch(error => {
            console.log(`Error saving event: ${error.message}`);
            next(error);
        });
    },


    show: (req, res, next) => {
        let eventId = req.params.id;
        Events.findById(eventId).then(
            event => {
                res.locals.event = event;
                next();
            }).catch(error =>{
                console.log(`Error fetching event by id : ${error.message}`);
                next(error);
            });
    },

    showView: (req, res ) => {
        res.render("events/show");
    },


    edit: (req, res, next) => {
        console.log("editFunction-called")
        let eventId = req.params.id;
        Events.findById(eventId).then(
            event => {
                res.render("events/edit", {
                    event: event
                })
            }
        ).catch(error => {
            console.log(`Error fetching event by ID: ${error.message}`);
            next(error);
        });
    },

    update: (req, res, next) =>{
        let eventId = req.params.id,
            eventParams = {
                name: req.body.name,
                email: req.body.email,
                zipCode: req.body.zipCode
        };
        console.log("updateFunction called")
        Events.findByIdAndUpdate(eventId,{$set: eventParams}).then(
            event => { 
                res.locals.redirect = `/events/${eventId}`;
                res.locals.event = event;
                next();
            }
        ).catch(error => {
            console.log(`Error updation event by ID: ${error.message}`);
            next(error);
        });
    },

    delete: (req, res, next) => {
        let eventId = req.params.id;
        Events.findByIdAndRemove(eventId)
       .then(() => {
       res.locals.redirect = "/events";
       next();
       })
       .catch(error => {
       console.log(`Error deleting event by ID: ${error.message}`);
       next();
       });
    },

    save: (req, res, next)=>{
        let eventId = req.params.id,
        courrentUser = req.user;

        if(currentUser){
            User.findByIdAndUpdate(currentUser, {
                $addToSet: {
                    events: eventId
                }
            }).then(() =>{
                res.locals.success = true;
                next();
            })
            .catch(error => {
                next(error);
            })
            
        }else{
            next(new Error("User must log in."));
        }
    },

    filterUserEvents: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        if(currentUser) {
            let mappedEvents = res.locals.events.map((event) => {
                let userSaved = currentUser.events.some((userEvent) => {
                    return userEvent.equals(event_id);
                });
                return Object.assign(event.toObject(), {saved: userSaved});
            });
            res.locals.events = mappedEvents;
            next();
        }else{
            next();
        }
    },


    redirectView: (req, res, next) =>{
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    }
}
