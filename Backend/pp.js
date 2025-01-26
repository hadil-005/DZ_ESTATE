const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./route");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const passport = require("passport");
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use(
  cors({
    origin: "https://dz-estate-smpt.vercel.app", // Autorise uniquement cette origine
    methods: ["GET", "POST", "PUT", "DELETE"], // Autorise ces méthodes
    allowedHeaders: ["Content-Type", "Authorization"], // Autorise ces en-têtes
    credentials: true, // Autorise les cookies
  })
);
app.use(express.json());
app.options("/api/alerts/alert", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://dz-estate-smpt.vercel.app"); // Origine spécifique
  res.header("Access-Control-Allow-Credentials", "true"); // Autorise les cookies
  res.header("Access-Control-Allow-Methods", "POST"); // Méthodes autorisées
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization" // En-têtes autorisés
  );
  res.sendStatus(204); // Répond avec un statut 204 (No Content)
});

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = pool;
const GOOGLE_CLIENT_ID =
  "408478996991-prag7l93m9v845ms2ft7oighd3o17edh.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = " 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";

app.use(
  session({
    secret:
      "d1565e2de497088d875c5b66f985b5245f559212a48773f1f6781ff76d501760f9558a3a5f8cee8d118b0abc9d35bd046f41579b2cfc79d420370d9ae570b26f",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:5173/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}`);
  },
});

const upload = multer({ storage: storage });
app.post(
  "/api/property/create",
  upload.array("photos", 10),
  async (req, res) => {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);

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
        user_id,
      } = req.body;
      console.log("Files in req.files:", req.files);
      // Check if files are uploaded, otherwise set photos to null
      let photos = null;
      if (req.files && req.files.length > 0) {
        photos = req.files.map((file) => ({
          originalname: file.originalname,
          filepath: file.path,
        }));
      }

      // Insert into database
      const query = `
  INSERT INTO property(title, "description", transaction_status, area, property_type, adress, commune, wilaya, price, user_id, photos_urls)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  RETURNING *;
`;
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
        photos ? JSON.stringify(photos) : null, // If photos are uploaded, store them, otherwise set null
      ];
      console.log(title);
      const result = await pool.query(query, values);

      res.status(201).json({
        message: "Property created successfully",
        property: result.rows[0],
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the property" });
    }
  }
);

app.use("/api/users", userRoutes);
app.use("/api/comments", userRoutes);
app.use("/api/property", userRoutes);
app.use("/api/history", userRoutes);
app.use("/api/messeges", userRoutes);
app.use("/api/likes", userRoutes);
app.use("/api/saved_posts", userRoutes);
app.use("/api/alerts", userRoutes);


const PORT = process.env.PORT || 3000; // Use Render's port or default to 3000 for local dev
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
