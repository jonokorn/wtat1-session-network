"use-strict"
const User = require("../models/users");
const passport = require("passport");
const token = process.env.TOKEN || "eventT0k3n";
const jsonWebToken = require("jsonwebtoken");
module.exports = {
    index: (req, res, next) =>{
        User.find({}).then(
            users => {
                res.locals.users = users;
                next();
            }
        ).catch(error => {
            console.log(`Error fetching users: ${error.message}`)
            next(error);
        });
    },
    indexView: (req, res) =>{
        res.render("users/index", {
            flashMessages: {
                success: "Loaded all users!"
            }
        });
    },
    new: (req, res) => {
        res.render("users/new");
    },
    create: (req, res, next) => {
        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            zipCode: req.body.zipCode
        };
        let newUser = new User(userParams);
        User.register(newUser, req.body.password).then(user => {
            if(user){
            req.flash("success", `${user.fullName}'s account created successfully!`);
            res.locals.redirect = "/users";
            //res.locals.user = user;
            next();
        }}).catch(error => {
            console.log(`Error saving user: ${error.message}`);
            req.flash(
                "error",
                `Failed to create user account because: ➥${error.message}.`
                );
            res.locals.redirect = "/users/new";
            next();
        });
    },

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId).then(
            user => {
                res.locals.user = user;
                next();
            }).catch(error =>{
                console.log(`Error fetching user by id : ${error.message}`);
                next(error);
            });
    },

    showView: (req, res ) => {
        res.render("users/show");
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId).then(
            user => {
                res.render("users/edit", {
                    user: user
                })
            }
        ).catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },
    
    update: (req, res, next) =>{
        let userId = req.params.id,
        userParams = {
                name: {
                    first: req.body.first,
                    last: req.body.last,
                },
                email: req.body.email,
                password: req.body.password,
                zipCode: req.body.zipCode
            };
        User.findByIdAndUpdate(userId,{$set: userParams}).then(
            user => { 
                res.locals.redirect = `/users/${userId}`;
                res.locals.user = user;
                next();
            }
        ).catch(error => {
            console.log(`Error updation user by ID: ${error.message}`);
            next(error);
        });
    },

    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
       .then(() => {
       res.locals.redirect = "/users";
       next();
       })
       .catch(error => {
       console.log(`Error deleting user by ID: ${error.message}`);
       next();
       });
    },

    verifyToken: (req, res, next) => {
        console.log("verify", req.query);
        let token = req.query.apiToken;
        if (token) {
        User.findOne({ apiToken: token })
       .then(user => {
       if (user) next();
       else {next(new Error("Invalid API token."));
       console.log("Error1");}
       })
       .catch(error => {
       next(new Error(error.message));
       console.log("Error2");
       });
        } else {
        next(new Error("Invalid API token."));
        console.log("Error3");
        }
    },

        authenticate: passport.authenticate(
            "local", {
                failureRedirect: "/users/login",
                failureFlash: "Failed to login.",
                successRedirect: "/",
                successFlash: "Logged in!"
            }),

        apiAuthenticate: (req, res, next) => {
            console.log("authenticate");
            passport.authenticate("local", (errors, user) => {
            if (user) {
           let signedToken = jsonWebToken.sign(
            {
           data: user._id,
            exp: new Date().setDate(new Date().getDate() + 1)
           },
           "secret_encoding_passphrase"
           );
           res.json({
           success: true,
           token: signedToken
           });
            } else
           res.json({
           success: false,
           message: "Could not authenticate user."
           });
            })(req, res, next);
           },

           verifyJWT: (req, res, next) => {
            let token = req.headers.token;
            if (token) {
            jsonWebToken.verify(
           token,
           "secret_encoding_passphrase",
           (errors, payload) => {
           if (payload) {
           User.findById(payload.data).then(user => {
           if (user) {
           next();
           } else {
           res.status(httpStatus.FORBIDDEN).json({
            error: true,
            message: "No User account found."
            });
            }
           });
           } else {
           res.status(httpStatus.UNAUTHORIZED).json({
           error: true,
           message: "Cannot verify API token."
           });
           next();
           }
           }
            );
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({
           error: true,
           message: "Provide Token"
            });
            }
           },
      validate: (req, res, next) => {
        req.sanitize("email").normalizeEmail({
          all_lowercase: true
        }).trim();
        req.check("email", "Email is invalid").isEmail();
        req.check("zipCode", "Zip Code is invalid").notEmpty().isInt().isLength({
          min: 5,
          max: 5
        }).equals(req.body.zipCode);
        req.check("password", "Password cannot be empty!").notEmpty();
        req.getValidationResult().then((error) => {
          if (!error.isEmpty()) {
            let message = error.array().map(e => e.msg);
            req.skip = true; 
            req.flash("error", message.join(" and "));
            res.locals.redirect = "/users/new";
            req.flash("Errro: Zip Code too short!");
            next();
          } else {
            next();
          }
        });
      },

      login: (req, res) => {
        res.render("users/login"); 
      },

      logout: (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
            req.flash("success", "You have been logged out!");
            next();    
          });
       
      },
    

    redirectView: (req, res, next) =>{
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    }
};

