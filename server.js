var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var port = process.env.PORT || 3006;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);



// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: 'app76371509.auth0.com',
    clientID: 'clSCUHBZd0T-P3Yg8M5b1je6L30lU8S0',
    clientSecret: '5EmkLn5n7w2b_YeLuZYjStnu_WqEEsHq6drAMGA5V8huTjVBi9oiC5BIBrPvSJmQ',
    callbackURL: 'https://enigmatic-caverns-14972.herokuapp.com/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// ...
app.use(passport.initialize());
app.use(passport.session());

app.listen(port);