
const Subscriber = require('../models/subscriber');


module.exports = {
    index: (req, res, next) => {
       Subscriber.find()
            .then(subscribers => {
                res.locals.subscribers = subscribers;
                next();
       })
       .catch(error => {
            console.log(`Error fetching subscribers: ${error.message}`);
            next(error);
      });
    },
    
        indexView: (req, res) => {
        res.render("subscribers/index");
    },
        
    new: (req, res) => {
        res.render("subscribers/new");
    },
    create: (req, res, next) => {
        let subscriberParams = {
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        };

        Subscriber.create(subscriberParams).then(subscriber => {
            res.locals.redirect = "/subscribers";
            res.locals.subscriber = subscriber;
            next();
        }).catch(error => {
            console.log(`Error saving subscriber: ${error.message}`);
            next(error);
        });
    },


    show: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId).then(
            subscriber => {
                res.locals.subscriber = subscriber;
                next();
            }).catch(error =>{
                console.log(`Error fetching subscriber by id : ${error.message}`);
                next(error);
            });
    },

    showView: (req, res ) => {
        res.render("subscribers/show");
    },


    edit: (req, res, next) => {
        console.log("editFunction-called")
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId).then(
            subscriber => {
                res.render("subscribers/edit", {
                    subscriber: subscriber
                })
            }
        ).catch(error => {
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        });
    },

    update: (req, res, next) =>{
        let subscriberId = req.params.id,
        subscriberParams = {
                name: req.body.name,
                email: req.body.email,
                zipCode: req.body.zipCode
        };
        console.log("updateFunction called")
        Subscriber.findByIdAndUpdate(subscriberId,{$set: subscriberParams}).then(
            subscriber => { 
                res.locals.redirect = `/subscribers/${subscriberId}`;
                res.locals.subscriber = subscriber;
                next();
            }
        ).catch(error => {
            console.log(`Error updation subscriber by ID: ${error.message}`);
            next(error);
        });
    },

    delete: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
       .then(() => {
       res.locals.redirect = "/subscribers";
       next();
       })
       .catch(error => {
       console.log(`Error deleting subscriber by ID: ${error.message}`);
       next();
       });
    },


    redirectView: (req, res, next) =>{
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    }
}
