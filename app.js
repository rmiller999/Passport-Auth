const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      User = require("./models/user"),
      localStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/auth_demo", {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(require("express-session")({
  secret: "Expecto Patronum",
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=============================
//ROUTES

app.get("/", function(req,res) {
  res.render("home")
});

app.get("/secret", function(req,res) {
  res.render("secret")
});

//AUTH ROUTES

//show sign up form
app.get("/register", function(req,res) {
  res.render("register")
});

//handle user sign up
app.post("/register", function(req,res) {
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err,user) {
    if(err) {
      console.log(err)
      res.render('register')
    } else {
      passport.authenticate("local")(req,res, function() {
        res.redirect("/secret")
      })
    }
  })
});

app.listen(3000, () => {
  console.log("Server Started!!!")
});