const express = require('express');
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const bodyParser = require("body-parser");
const userRoutes = require('./route');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const passport = require('passport');
app.use(cookieParser()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://DZestate_owner:ZMrytvCKhe04@ep-soft-cell-a5j0gqje.us-east-2.aws.neon.tech/DZestate?sslmode=require',
});

const db = pool;
const GOOGLE_CLIENT_ID = "408478996991-prag7l93m9v845ms2ft7oighd3o17edh.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = " 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";

app.use(session({
  secret: 'd1565e2de497088d875c5b66f985b5245f559212a48773f1f6781ff76d501760f9558a3a5f8cee8d118b0abc9d35bd046f41579b2cfc79d420370d9ae570b26f',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/auth/google", passport.authenticate("google", { 
  scope: ["profile", "email"] 
}));



app.post('/logout', (req, res) => {
  res.clearCookie('token');  // Clears the token cookie
  res.status(200).json({ message: 'Logged out successfully' });
});




app.use('/api/users', userRoutes);
app.use('/api/comments', userRoutes);
app.use('/api/property', userRoutes);
app.use('/api/history', userRoutes);
app.use('/api/messeges', userRoutes);


const PORT = 3434;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
