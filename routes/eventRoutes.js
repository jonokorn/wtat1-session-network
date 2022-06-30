const router = require("express").Router(),
 eventsController = require("../controllers/eventsController");
 

 router.get("/", eventsController.index, eventsController.indexView);
 router.get("/new", eventsController.new);
 router.get("/:id/edit", eventsController.edit);
 router.get("/:id", eventsController.show, eventsController.showView);


 router.put("/:id/update", eventsController.update, eventsController.redirectView);

router.post("/create", eventsController.create, eventsController.redirectView)

 router.delete("/:id/delete", eventsController.delete, eventsController.redirectView);

 module.exports = router;