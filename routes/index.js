// routes/index.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

const env = {
  AUTH0_CLIENT_ID: 'clSCUHBZd0T-P3Yg8M5b1je6L30lU8S0',
  AUTH0_DOMAIN: 'app76371509.auth0.com',
  AUTH0_CALLBACK_URL: 'https://enigmatic-caverns-14972.herokuapp.com/callback'
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
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