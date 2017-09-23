var express = require("express");

var router = express.Router();
var passport = require('passport');

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

var env = {
  AUTH0_CLIENT_ID: 'clSCUHBZd0T-P3Yg8M5b1je6L30lU8S0',
  AUTH0_DOMAIN: 'app76371509.auth0.com',
  AUTH0_CALLBACK_URL: 'https://enigmatic-caverns-14972.herokuapp.com/callback'
};


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function (req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
      req.body.burger_name, req.body.devoured
    ], function () {
      res.redirect("/");
    });
});

router.put("/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function () {
    res.redirect("/");
  });
});




// Perform the login
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid'
  }),
  function (req, res) {
    res.redirect('/');
  }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);

// Export routes for server.js to use.
module.exports = router;