
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser')
const crypto = require('crypto');
const { console } = require('inspector');
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);




console.log(secret);

//
const pool = new Pool({
  connectionString:
    "postgresql://DZestate_owner:ZMrytvCKhe04@ep-soft-cell-a5j0gqje.us-east-2.aws.neon.tech/last_version_from_me?sslmode=require",
});

const db = pool;

async function signup(req, res) {
  try {
    const { first_name, family_name, email, password, phone_number } = req.body;

    const existingUserQuery = "SELECT * FROM users WHERE email = $1";
    const existingUser = await pool.query(existingUserQuery, [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      INSERT INTO users (first_name, family_name, email, password, phone_number) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const newUser = await pool.query(insertUserQuery, [
      first_name,
      family_name,
      email,
      hashedPassword,
      phone_number,
    ]);

    const token = jwt.sign(
      { id: newUser.rows[0].id, first_name, family_name, email },
      secret,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "Strict",
    });

    res.status(201).json({
      message: "User signed up successfully",
      user: {
        first_name,
        family_name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const findUserQuery = "SELECT * FROM users WHERE email = $1";
    const user = await pool.query(findUserQuery, [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Génère le token JWT
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        first_name: user.rows[0].first_name,
        family_name: user.rows[0].family_name,
        email,
      },
      secret
    );

    // Stocke le token dans un cookie
    res.cookie("token", token, {
      httpOnly: true, // Empêche l'accès au cookie via JavaScript
      secure: process.env.NODE_ENV === "production", // Envoie le cookie uniquement en HTTPS en production
      sameSite: "strict", // Protège contre les attaques CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // Durée de vie du cookie (7 jours)
    });

    // Renvoie la réponse avec le token et les informations de l'utilisateur
    res.status(200).json({
      message: "Login successful",
      token, // Token envoyé dans la réponse JSON (optionnel)
      user: {
        first_name: user.rows[0].first_name,
        family_name: user.rows[0].family_name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function authenticate(req, res, next) {
  const token = req.cookies.token; // Récupère le token depuis les cookies

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = decoded;
    next(); // Passe au middleware suivant
  });
}
// const addComment = async (req, res) => {
//   console.log("aa");
//   try {
//     // Extract token from headers and validate it
//     const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
//     if (!token) {
//       return res
//         .status(401)
//         .json({ error: "Authentication token is missing." });
//     }
//     console.log("Token:", token);

//     // Decode the JWT token with proper error handling
//     const decoded = jwt.verify(token, secret); // Decode the token using the secret
//     console.log("alert invoked");

//     const userId = decoded.id;
//     if (!userId) {
//       return res
//         .status(401)
//         .json({ error: "Invalid token. User ID is missing." });
//     }

//     console.log("User ID from token:", userId); // Log user ID for debugging

//     const { content } = req.body; // Get content from request body
//     if (!content) {
//       return res.status(400).json({ error: "Comment content is required." });
//     }
//     console.log("Content:", content);

//     // Insert comment into database
//     const createdAt = new Date();
//     const query = `
//       INSERT INTO comments (user_id, content, created_at)
//       VALUES ($1, $2, $3)
//       RETURNING *;
//     `;

//     const result = await pool.query(query, [userId, content, createdAt]);

//     // Send the response with the inserted comment
//     res.status(201).json({ comment: result.rows[0] });
//   } catch (error) {
//     console.error("Error adding comment:", error);

//     // Check if the error was due to the JWT verification
//     if (error instanceof jwt.JsonWebTokenError) {
//       return res.status(401).json({ error: "Invalid or expired token." });
//     }

//     // Generic error handling
//     res.status(500).json({ error: error.message });
//   }
// };
const getRandomProperties = async (req, res) => {
  try {
    const { limit = 30, property_type } = req.query;

    let query = "SELECT * FROM property";

    if (property_type) {
      query += ` WHERE property_type = $1`;
    }

    query += ` ORDER BY RANDOM() LIMIT $${property_type ? 2 : 1}`;

    const values = property_type ? [property_type, limit] : [limit];

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error("Error retrieving random properties", err);
    res.status(500).json({ error: "Error retrieving random properties" });
  }
};

// const addComment = async (req, res) => {
//   try {
//     console.log("addComment invoked");

//     // Extract token from headers and validate it
//     // const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

//     // if (!token) {
//     //   return res
//     //     .status(401)
//     //     .json({ error: "Authentication token is missing." });
//     // }
//     // console.log("Token:", token);

//     // // Decode and verify the JWT token with proper error handling
//     // const decoded = jwt.verify(token, secret); // Decode and verify the token using the secret
//     // console.log("Decoded token:", decoded);

//     // const userId = decoded.id;
//     // if (!userId) {
//     //   return res
//     //     .status(401)
//     //     .json({ error: "Invalid token. User ID is missing." });
//     // }

//     // console.log("User ID from token:", userId);

//     // Extract comment content from request body
//     const { content } = req.body;
//     if (!content) {
//       return res.status(400).json({ error: "Comment content is required." });
//     }
//     console.log("Content:", content);

//     // Insert comment into database
//     const createdAt = new Date();
//     const query = `
//       INSERT INTO comments  content, created_at)
//       VALUES ($1, $2)
//       RETURNING *;
//     `;

//     const result = await pool.query(query, [content, createdAt]);

//     // Send the response with the inserted comment
//     res.status(201).json({ comment: result.rows[0] });
//   } catch (error) {
//     console.error("Error adding comment:", error);

//     // Handle JWT validation error
//     if (error instanceof jwt.JsonWebTokenError) {
//       return res.status(401).json({ error: "Invalid or expired token." });
//     }

//     // Generic error handling
//     res.status(500).json({ error: error.message });
//   }
// };
const addComment = async (req, res) => {
  try {
    console.log("addComment invoked");

    // Extract comment content from request body
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Comment content is required." });
    }
    console.log("Content:", content);

    // Insert comment into the database
    const createdAt = new Date();
    const query = `
      INSERT INTO comments (content, created_at) 
      VALUES ($1, $2) 
      RETURNING *;
    `;

    const result = await pool.query(query, [content, createdAt]);

    // Send the response with the inserted comment
    res.status(201).json({ comment: result.rows[0] });
  } catch (error) {
    console.error("Error adding comment:", error);

    // Generic error handling
    res.status(500).json({ error: error.message });
  }
};

const getRandomComments = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM comments ORDER BY RANDOM() LIMIT 10`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error retrieving random comments:", err);
    res.status(500).json({ error: "Error retrieving random comments" });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM property WHERE id = $1", [id]);

    if (result.rowCount > 0) {
      return res.json({ message: "Property deleted successfully" });
    } else {
      return res.status(404).json({ message: "Property not found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the property" });
  }
};

const addLike = async (req, res) => {
  const { user_id, property_id } = req.body;

  try {
    await pool.query("BEGIN");

    const result = await pool.query(
      "INSERT INTO likes (user_id, property_id) VALUES ($1, $2) RETURNING id",
      [user_id, property_id]
    );

    if (result.rowCount > 0) {
      await pool.query(
        "UPDATE property SET likes_count = likes_count + 1 WHERE id = $1",
        [property_id]
      );

      await pool.query("COMMIT");

      return res.status(201).json({
        message: "Like added successfully",
        likeId: result.rows[0].id,
      });
    } else {
      await pool.query("ROLLBACK");
      return res.status(400).json({ message: "Failed to add like" });
    }
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the like" });
  }
};

const saveProperty = async (req, res) => {
  const { user_id, property_id } = req.body;

  try {
    await pool.query("BEGIN");

    const result = await pool.query(
      "INSERT INTO saved_posts (user_id, property_id) VALUES ($1, $2) RETURNING id, saved_at",
      [user_id, property_id]
    );

    if (result.rowCount > 0) {
      await pool.query("COMMIT");

      return res.status(201).json({
        message: "Property saved successfully",
        savedPostId: result.rows[0].id,
        savedAt: result.rows[0].saved_at,
      });
    } else {
      await pool.query("ROLLBACK");
      return res.status(400).json({ message: "Failed to save property" });
    }
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while saving the property" });
  }
};

const his = async (req, res) => {
  const { property_id, buyer_email, new_status } = req.body;

  try {
    const buyerResult = await pool.query(
      "SELECT id, first_name, family_name FROM users WHERE email = $1",
      [buyer_email]
    );

    if (buyerResult.rowCount === 0) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    const buyer_id = buyerResult.rows[0].id;
    const buyer_first_name = buyerResult.rows[0].first_name;
    const buyer_family_name = buyerResult.rows[0].family_name;

    const updatePropertyResult = await pool.query(
      "UPDATE property SET buyer_id = $1, transaction_status = $2 WHERE id = $3 RETURNING id",
      [buyer_id, new_status, property_id]
    );

    if (updatePropertyResult.rowCount === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while processing the transaction" });
  }
};

const updateProperty = async (req, res) => {
  const { property_id, buyer_id, new_status } = req.body;

  try {
    // Update the property status and set the buyer_id
    const updatePropertyResult = await pool.query(
      "UPDATE property SET buyer_id = $1, transaction_status = $2 WHERE id = $3 RETURNING id",
      [buyer_id, new_status, property_id]
    );

    // Check if the property was found and updated
    if (updatePropertyResult.rowCount === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      message: "Property status updated successfully",
      propertyId: updatePropertyResult.rows[0].id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

const getit = async (req, res) => {
  const token = req.cookies.token; // Get the token from the cookies

  if (!token) {
    return res.status(401).json({ message: "No token provided, please login" });
  }
};

const createMessage = async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  const message_date = new Date(); // current date and time

  const query = `
    INSERT INTO messages (sender_id, receiver_id, content, message_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [sender_id, receiver_id, content, message_date];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating message:", err);
    res.status(500).json({ error: "Failed to create message" });
  }
};

const sezarchProperties = async (req, res) => {
  try {
    const {  commune} = req.body;

    // Validate that at least one search field is provided

    if (!commune ) {
      return res.status(400).json({ error: 'At least one search criterion must be provided' });
    }

    // Build the dynamic SQL query
    let query = "SELECT * FROM property WHERE 1=1";
    const values = [];

    if (wilaya) {
      query += ` AND wilaya ILIKE $${values.length + 1}`;
      values.push(`%${wilaya}%`);
    }

    if (commune) {
      query += ` AND commune ILIKE $${values.length + 1}`;
      values.push(`%${commune}%`);
    }

    if (property_type) {
      query += ` AND property_type ILIKE $${values.length + 1}`;
      values.push(`%${property_type}%`);
    }

    // Execute the query
    const result = await pool.query(query, values);

    // Return results or handle no match
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found matching your criteria" });
    }

    res.status(200).json({ properties: result.rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for properties" });
  }
};

const searchProperties = async (req, res) => {
  try {
    console.log("zz")
    const { commune } = req.body;
    console.log(req.body);
    // Validate that the commune is provided
    if (!commune) {
      return res.status(400).json({ error: 'Commune is required to search for properties' });
    }

    // Build the query for searching by commune
    const query = 'SELECT * FROM property WHERE commune ILIKE $1';
    const values = [`%${commune}%`];

    // Execute the query
    const result = await pool.query(query, values);

    // Return results or handle no match
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No properties found in the specified commune' });
    }

    res.status(200).json({ properties: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for properties' });
  }
};

const getMessages = async (req, res) => {
  const { sender_id, receiver_id } = req.query;

  const query = `
    SELECT * FROM messages
    WHERE (sender_id = $1 AND receiver_id = $2)
       OR (sender_id = $2 AND receiver_id = $1)
    ORDER BY message_date ASC;
  `;
  const values = [sender_id, receiver_id];

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
const getSavedProperties = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Validate if the user_id is provided
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Step 1: Get the property IDs that the user has saved from the saved_posts table
    const savedPropertiesQuery = `
      SELECT property_id
      FROM saved_posts
      WHERE user_id = $1;
    `;
    const savedPropertiesResult = await pool.query(savedPropertiesQuery, [
      user_id,
    ]);

    // Step 2: If no saved properties found
    if (savedPropertiesResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No saved properties found for this user" });
    }

    // Step 3: Collect all the property IDs
    const propertyIds = savedPropertiesResult.rows.map(
      (row) => row.property_id
    );

    // Step 4: Fetch the property details based on the saved property IDs
    const propertiesQuery = `
      SELECT 
        p.id,
        p.title,
        p.price,
        p.transaction_status,
        p.location AS address,
        p.likes_count,
        CASE
          WHEN p.photo_urls IS NOT NULL AND p.photo_urls != '{}' THEN p.photo_urls[1]
          ELSE NULL
        END AS photo_address
      FROM property p
      WHERE p.id = ANY($1);
    `;

    const propertiesResult = await pool.query(propertiesQuery, [propertyIds]);

    // Step 5: Return the saved properties
    res.status(200).json({ saved_properties: propertiesResult.rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving saved properties" });
  }
};

const getPropertyDetails = async (req, res) => {
  try {
    const { property_id } = req.params;

    // Validate if the property_id is provided
    if (!property_id) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    // Step 1: Get the property details by property_id
    const query = `
      SELECT 
        id,
        title,
        description,
        price,
        wilaya,
        commune, 
        property_type,
        area,
        transaction_status,
        user_id,
        likes_count,
        buyer_id,
        photos_urls
      FROM property
      WHERE id = $1;
    `;

    const result = await pool.query(query, [property_id]);

    // Step 2: If no property found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Step 3: Return the property details
    res.status(200).json({ property: result.rows[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving property details" });
  }
};


const geetThreeRandomProperties = async (req, res) => {
    try {
      const query = `
        SELECT 
        id,
        price, 
        transaction_status, 
        title, 
        wilaya,
        commune,
        likes_count
      FROM property
      ORDER BY RANDOM()
      LIMIT 3;
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }

    res.status(200).json({ properties: result.rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving random properties" });
  }
};


const getThreeRandomProperties = async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        price, 
        transaction_status, 
        title, 
        wilaya,
        commune,
        likes_count,
        area,
        rooms,
        photo1,
        save_count
      FROM property
      ORDER BY RANDOM()
      LIMIT 3;
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No properties found' });
    }

    res.status(200).json({ properties: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving random properties' });
  }
};



  const getLikedProperties = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Validate if the user_id is provided
      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      // Step 1: Get the property IDs that the user has liked from the liked_posts table
      const likedPropertiesQuery = `
        SELECT property_id
        FROM likes
        WHERE user_id = $1;
      `;
    const likedPropertiesResult = await pool.query(likedPropertiesQuery, [
      user_id,
    ]);

    // Step 2: If no liked properties found
    if (likedPropertiesResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No liked properties found for this user" });
    }

    // Step 3: Collect all the property IDs
    const propertyIds = likedPropertiesResult.rows.map(
      (row) => row.property_id
    );

    // Step 4: Fetch the property details based on the liked property IDs
    const propertiesQuery = `
        SELECT 
          p.id,
          p.title,
          p.price,
          p.transaction_status,
          p.wilaya,
          p.commune, 
          p.likes_count,
          CASE
            WHEN p.photos_urls IS NOT NULL AND p.photos_urls != '{}' THEN p.photos_urls[1]
            ELSE NULL
          END AS photo_address
        FROM property p
        WHERE p.id = ANY($1);
      `;

    const propertiesResult = await pool.query(propertiesQuery, [propertyIds]);

    // Step 5: Return the liked properties
    res.status(200).json({ liked_properties: propertiesResult.rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving liked properties" });
  }
};

const logout = (req, res) => {
  // Clear the cookie
  res.clearCookie("token"); // replace 'token' with your actual cookie name if different

  res.status(200).json({ message: "Logged out successfully" });
};

async function lert(req, res) {
  try {
    console.log("alert invoked");
    // Extract token from cookies and validate it
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token Bearer
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication token is missing." });
    }
    console.log(token);

    const decoded = jwt.verify(token, secret); // Decode the JWT token

    const userId = decoded.id;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Invalid token. User ID is missing." });
    }

    console.log("User ID from token:", userId); // Log user ID for debugging

    // Extract the alert data from the request body
    const { wilaya, commune, property_type, max_price, area, rooms_number } =
      req.body;

    // Check if any required field is missing
    if (
      !wilaya ||
      !commune ||
      !property_type ||
      !max_price ||
      !area ||
      !rooms_number
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const insertAlertQuery = `
      INSERT INTO alerts (user_id, wilaya, commune, property_type, max_price, area, rooms_number) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const newAlert = await pool.query(insertAlertQuery, [
      userId,
      wilaya,
      commune,
      property_type,
      max_price,
      area,
      rooms_number,
    ]);
    res.status(201).json({
      message: "Alert created successfully",
      alert: newAlert.rows[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  lert,
  logout,
  getPropertyDetails,
  getLikedProperties,
  getSavedProperties,
  getThreeRandomProperties,
  searchProperties,
  getit,
  addComment,
  signup,
  getRandomComments,
  his,
  createMessage,
  getMessages,
  saveProperty,
  login,
  addLike,
  authenticate,
  addComment,
  getThreeRandomProperties,
  deleteProperty,
  getRandomProperties,
  getRandomComments,
};
