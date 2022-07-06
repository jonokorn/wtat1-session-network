const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    subscriberRoutes = require("./subscriberRoutes"),
    errorRoutes = require("./errorRoutes"),
    homeRoutes = require("./homeRoutes"),
    eventRoutes = require("./eventRoutes"),
    apiRoutes = require("./apiRoutes");



    router.use("/users", userRoutes);
    router.use("/subscribers", subscriberRoutes);
    router.use("/events", eventRoutes);
    router.use("/api", apiRoutes);
    router.use("/", homeRoutes);
    
 
    module.exports = router;
  