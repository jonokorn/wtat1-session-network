const express = require("express"),
    layouts = require("express-ejs-layouts"),
    expressValidator = require("express-validator"),
    passport = require('passport'),
    mongoose = require("mongoose"), 
    methodOverride = require("method-override"),  
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
    expressSession = require("express-session"),
    User = require("./models/users"),
    router = require("./routes/index") 
    app = express();



mongoose.Promise = global.Promise;    

mongoose.connect(
    "mongodb+srv://admin:qwer1234@cluster0.je9zl.mongodb.net/?retryWrites=true&w=majority",
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
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(connectFlash());  

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
   });

app.use(layouts);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")

const server = app.listen(app.get("port"), () => {
console.log(`Server running at http://localhost:${ app.get("port") }`); }),
io = require("socket.io")(server);
require("./controllers/chatController")(io)

app.use(express.static("public"));

app.use("/", router);

app.post("/", (req, res) =>{
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});










