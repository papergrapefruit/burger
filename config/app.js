// app.js

const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
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