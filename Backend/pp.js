const express = require("express");
const cors = require("cors");
const JWT = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const userRoutes = require("./route");
const fs = require("fs");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const passport = require("passport");
app.use(cookieParser());
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// app.use(bodyParser.json()); //ust the size as needed
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dsbox1txz",
  api_key: "294792496868756",
  api_secret: "2VSmn_Wen1P2XRGlKl0fFxZ7HwM",
});

const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgresql://DZestate_owner:ZMrytvCKhe04@ep-soft-cell-a5j0gqje-pooler.us-east-2.aws.neon.tech/last_version_from_me?sslmode=require",
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
      callbackURL: "http://127.0.0.1:3000/auth/google/callback",
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

const jwt = JWT;

const crypto = require("crypto");

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(express.json());
app.options("/api/alerts/alert", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Origine spécifique
  res.header("Access-Control-Allow-Credentials", "true"); // Autorise les cookies
  res.header("Access-Control-Allow-Methods", "POST"); // Méthodes autorisées
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization" // En-têtes autorisés
  );
  res.sendStatus(204); // Répond avec un statut 204 (No Content)
});

// Handle preflight requests
// app.options(
//   "/api/property/create",
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// const secret = crypto.randomBytes(64).toString("hex");
const secret = "asma";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Ensure this path exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filenames
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // Limit file size to 10MB
});
app.post(
  "/api/property/create",
  upload.array("photos"), // Expecting up to 3 files under the "photos" key
  async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", req.files);

      // Extract and verify token
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ error: "Authentication token is missing" });
      }
      const decoded = jwt.verify(token, secret);
      const user_id = decoded.id;
      const userQuery = `SELECT email, phone_number FROM users WHERE id = $1`;
      const userResult = await pool.query(userQuery, [user_id]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      const { email, phone_number } = userResult.rows[0];
      // Extract fields from req.body
      const {
        wilaya,
        commune,
        adress_gmaps,
        title,
        description,
        area,
        price,
        transaction_status,
        property_type,
        rooms,
      } = req.body;

      // Upload photos to Cloudinary
      const photoUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        photoUrls.push(result.secure_url);
        fs.unlinkSync(file.path); // Clean up local file
      }
      console.log("Photo URLs:", photoUrls);

      // Insert property details into the database
      // const propertyQuery = `
      //   INSERT INTO property(
      //     title, description, transaction_status, area, adress_gmaps, property_type, adress,phone_number, email ,price , rooms , user_id , commune, wilaya
      //   )
      //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11 ,$12, $13, $14 )
      //   RETURNING id;
      // `;
      // const propertyValues = [
      //   title,
      //   description,
      //   transaction_status,
      //   area,
      //   adress_gmaps,
      //   property_type,
      //   null,
      //   commune,
      //   wilaya,
      //   price,
      //   user_id,
      //   rooms,
      //   phone_number,
      //   email,
      // ];

      // Insert property details into the database
      const propertyQuery = `
  INSERT INTO property(
    title, description, transaction_status, area, adress_gmaps, property_type, adress, commune, wilaya, price, rooms, user_id, phone_number, email
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING id;
`;
      const propertyValues = [
        title, // $1
        description, // $2
        transaction_status, // $3
        area, // $4
        adress_gmaps, // $5
        property_type, // $6
        null, // $7 (adress, set to NULL)
        commune, // $8
        wilaya, // $9
        price, // $10
        rooms ? parseInt(rooms, 10) : null, // $11 (ensure rooms is an integer or null)
        user_id, // $12
        phone_number, // $13
        email, // $14
      ];

      const propertyResult = await pool.query(propertyQuery, propertyValues);
      const propertyId = propertyResult.rows[0].id;

      // Update photos in the database
      if (photoUrls.length > 0) {
        const photoQuery = `
          UPDATE property
          SET photo1 = $1, photo2 = $2, photo3 = $3
          WHERE id = $4;
        `;
        const photoValues = [
          photoUrls[0] || null,
          photoUrls[1] || null,
          photoUrls[2] || null,
          propertyId,
        ];
        await pool.query(photoQuery, photoValues);
      }

      res.status(201).json({
        message: "Property created successfully",
        property: propertyResult.rows[0],
      });
    } catch (error) {
      console.error("Error occurred while creating property:", error);
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
app.use("/api/property", userRoutes);

const http = require("http");

// Step 2: Create an HTTP server and initialize WebSocket
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  },
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // Join a room based on user ID
  socket.on("setup", (userData) => {
    socket.join(userData?.id);
    console.log(`User ${userData?.id} joined their room`);
    socket.emit("connected");
  });

  // Join a chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User joined chat room: ${room}`);
  });

  // Handle new messages
  socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;
    if (!chat?.users) return console.log("Chat users not defined");

    // Emit the message to all users in the chat except the sender
    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return;
      socket.to(user._id).emit("message received", newMessage);
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

// Step 5: Pass `io` and `pool` to routes
app.use((req, res, next) => {
  req.io = io; // Pass WebSocket instance
  req.pool = pool; // Pass PostgreSQL pool
  next();
});

app.use("/api/messages", userRoutes);
