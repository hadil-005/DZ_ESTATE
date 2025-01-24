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
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dsbox1txz',
  api_key: '2942VSmn_Wen1P2XRGlKl0fFxZ7HwM792496868756',
  api_secret: '2VSmn_Wen1P2XRGlKl0fFxZ7HwM'
});

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://DZestate_owner:ZMrytvCKhe04@ep-soft-cell-a5j0gqje.us-east-2.aws.neon.tech/last_version_from_me?sslmode=require'});

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

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}`
    );
  },
});

const upload = multer({ storage: storage });
app.post('/api/property/create', upload.array('photos', 10), async (req, res) => {
  console.log('Files received:', req.files);
  console.log('Body received:', req.body);

  try {
    const {
      title,
      description,
      transaction_status,
      area,
      property_type,
      adress,
      commune,
      wilaya,
      price,
      user_id
    } = req.body;
    console.log('Files in req.files:', req.files);
    // Check if files are uploaded, otherwise set photos to null
    let photos = null;
    if (req.files && req.files.length > 0) {
      photos = req.files.map(file => ({
        originalname: file.originalname,
        filepath: file.path
      }));
    }

    // Insert into database
    const query = `
  INSERT INTO property(title, "description", transaction_status, area, property_type, adress, commune, wilaya, price, user_id, photos_urls)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  RETURNING *;
` ;
    const values = [
      title,
      description || null,
      transaction_status,
      area,
      property_type,
      adress,
      commune,
      wilaya,
      price,
      user_id,
      photos ? JSON.stringify(photos) : null // If photos are uploaded, store them, otherwise set null
    ];
    console.log(title);
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Property created successfully',
      property: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the property' });
  }
});


app.use('/api/users', userRoutes);
app.use('/api/comments', userRoutes);
app.use('/api/property', userRoutes);
app.use('/api/history', userRoutes);
app.use('/api/messeges', userRoutes);
app.use('/api/likes', userRoutes);
app.use('/api/saved_posts', userRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
