const router = require("express").Router(),
 usersController = require("../controllers/usersController");

 
 router.get("/new", usersController.new); 
 router.get("/login", usersController.login); 
 router.get("/logout", usersController.logout, usersController.redirectView)
 router.get("/:id", usersController.show, usersController.showView);
 router.get("/:id/edit", usersController.edit);
 router.get("/", usersController.index, usersController.indexView);
  
 router.post("/create", usersController.create, usersController.validate, usersController.redirectView);
 router.post("/login", usersController.authenticate);

 router.put("/:id/update", usersController.update, usersController.redirectView);

 router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

 module.exports = router;