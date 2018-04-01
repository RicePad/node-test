const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');



const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);


// app.get('/', (req, res) => {
// 	res.send({ hi: 'there' });
// });

//Route Handlers
	app.get(
	  '/auth/google',
	  passport.authenticate('google', {
	    scope: ['profile', 'email']
	  })
	);

	app.get('/auth/google', passport.authenticate('google'));


//Heroku configuration for production enviroment
const PORT = process.env.PORT || 5000;

app.listen(PORT);
