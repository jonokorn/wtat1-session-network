const router = require("express").Router(),
    eventsController = require("../controllers/EventsController");

router.get("/events", eventsController.index, eventsController.filterUserEvents, eventsController.respondJSON),
router.use(eventsController.errorJSON);
router.get("/events/:id/save", eventsController.save, eventsController.respondJSON)


module.exports = router;