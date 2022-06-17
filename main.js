const { nextTick } = require("process");
const subscriber = require("./models/subscriber");

const express = require("express"),
    layouts = require("express-ejs-layouts"),
    expressValidator = require("express-validator"),
    homeController = require('./controllers/homeController'),
    errorController = require('./controllers/errorController'),
    postController = require('./controllers/postController'),
    eventsController = require("./controllers/EventsController"),
    subscribersController = require("./controllers/SubscribersController"),
    usersController = require("./controllers/usersController"),
    mongoose = require("mongoose"), 
    methodOverride = require("method-override"),  
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
    expressSession = require("express-session"),
    app = express();


mongoose.Promise = global.Promise;    

mongoose.connect(
    "mongodb://localhost:27017/music_network_db",
    {useNewUrlParser: true}
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!")
});

app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
   }));

app.use(expressValidator());
app.use(cookieParser("secret_passcode"));

app.use(expressSession({
    secret: "secret_passode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitalized: false
}));



app.use(connectFlash());  

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
   });

app.use(layouts);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${ app.get("port") }`);
});



app.get("/contact", homeController.getContactPage);
app.get("/register", homeController.getRegisterPage);
app.get("/", homeController.getHomePage);
app.get("/subscribers", subscribersController.index, subscribersController.indexView);
app.get("/subscribers/new", subscribersController.new);
app.get("/subscribers/:id/edit", subscribersController.edit);
app.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
app.get("/users/new", usersController.new);
app.get("/users", usersController.index, usersController.indexView);
app.get("/users/login", usersController.login); 
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.get("/events", eventsController.index, eventsController.indexView);
app.get("/events/new", eventsController.new);
app.get("/events/:id/edit", eventsController.edit);
app.get("/events/:id", eventsController.show, eventsController.showView);




app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
app.put("/events/:id/update", eventsController.update, eventsController.redirectView);


app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
app.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);
app.delete("/events/:id/delete", eventsController.delete, eventsController.redirectView);


app.post("/register", homeController.getRegisterDonePage);
app.post("/users/create", usersController.create, usersController.validate, usersController.redirectView);
app.post("/subscriber/create", subscribersController.create, subscribersController.redirectView);
app.post("/users/login", usersController.authenticate, usersController.redirectView);

app.use(express.static("public"));
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);



app.post("/", (req, res) =>{
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});








