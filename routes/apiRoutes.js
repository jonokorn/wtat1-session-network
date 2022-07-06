const router = require("express").Router(),
    eventsController = require("../controllers/EventsController"),
    usersController = require("../controllers/usersController");

    
router.post("/login", usersController.apiAuthenticate);
router.use(usersController.verifyJWT)
router.use(usersController.verifyToken);
router.get("/events", eventsController.index, eventsController.filterUserEvents, eventsController.respondJSON),
router.use(eventsController.errorJSON);
router.get("/events/:id/save", eventsController.save, eventsController.respondJSON)


module.exports = router;