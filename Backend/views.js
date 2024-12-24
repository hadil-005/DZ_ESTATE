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
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);



// 
const pool = new Pool({
  connectionString: 'postgresql://DZestate_owner:ZMrytvCKhe04@ep-soft-cell-a5j0gqje.us-east-2.aws.neon.tech/DZestate?sslmode=require',
});

const db = pool;

async function signup(req, res) {
  try {
    const { first_name, family_name, email, password, phone_number } = req.body;

    const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
    const existingUser = await pool.query(existingUserQuery, [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
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
      { expiresIn: '1h' } 
    );

    res.cookie('token', token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      maxAge: 3600000,  
      sameSite: 'Strict', 
    });

    res.status(201).json({
      message: 'User signed up successfully',
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

    const findUserQuery = 'SELECT * FROM users WHERE email = $1';
    const user = await pool.query(findUserQuery, [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, first_name: user.rows[0].first_name, family_name: user.rows[0].family_name, email },
      secret,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      maxAge: 3600000, 
      sameSite: 'Strict',  
    });

    res.status(200).json({
      message: 'Login successful',
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
  const token = req.cookies.token;  

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
    req.user = decoded; 
  });
}



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

const createPostForProperty = async (req, res) => {
  try {
    const { title, description, price, location, property_type, area, transaction_status, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!title || !description || !price || !location || !property_type || !area || !transaction_status) {
      return res.status(400).json({
        message: 'All fields are required: title, description, price, location, property_type, area, and transaction_status.'
      });
    }

    if (isNaN(price) || isNaN(area)) {
      return res.status(400).json({ message: "Price and Area must be valid numbers" });
    }

    const newProperty = await db.query(
      `INSERT INTO property (title, description, price, location, property_type, area, transaction_status, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, price, location, property_type, area, transaction_status, user_id]
    );

    res.status(201).json(newProperty.rows[0]);
  } catch (error) {
    console.error("Error during property creation:", error);
    res.status(500).json({ message: "Error creating property", error: error.message });
  }
};

const createPostForPropertyy = async (req, res) => {
  try {
    const { title, description, price, location, property_type, area, transaction_status, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!title || !description || !price || !location || !property_type || !area || !transaction_status) {
      return res.status(400).json({
        message: 'All fields are required: title, description, price, location, property_type, area, and transaction_status.'
      });
    }

    const result = await pool.query(
      `INSERT INTO property (title, description, price, location, property_type, area, transaction_status, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, price, location, property_type, area, transaction_status, user_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error during property creation:", error);
    res.status(500).json({ message: "Error creating property", error: error.message });
  }
};

const cc = (req, res) => {
  const { title, description, price, location, property_type, area, transaction_status, user_id } = req.body;
  
  const photoUrls = req.files.map(file => `/uploads/${file.filename}`);

  const query = `
    INSERT INTO property (title, description, price, location, property_type, area, transaction_status, user_id, photos)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
  `;
  const values = [title, description, price, location, property_type, area, transaction_status, user_id, photoUrls];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error during property creation:', err);
      res.status(500).json({ error: 'Error during property creation' });
    } else {
      const createdProperty = result.rows[0];
      res.status(201).json({
        id: createdProperty.id,
        title: createdProperty.title,
        description: createdProperty.description,
        price: createdProperty.price,
        location: createdProperty.location,
        property_type: createdProperty.property_type,
        area: createdProperty.area,
        transaction_status: createdProperty.transaction_status,
        user_id: createdProperty.user_id,
        photos: createdProperty.photos,
      });
    }
  });
};
const zz = (req, res) => {
  console.log("tktk");
  console.log(req.files); 
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No photos uploaded' });
  }
  console.log(req.files); 
  const { title, description, price, location, property_type, area, transaction_status, user_id } = req.body;

  const photoUrls = req.files.map(file => `/uploads/${file.filename}`);
  
  console.log(photoUrls);

  const query = `
    INSERT INTO property (title, description, price, location, property_type, area, transaction_status, user_id, photo_urls)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
  `;
  const values = [title, description, price, location, property_type, area, transaction_status, user_id, photoUrls];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error during property creation:', err);
      res.status(500).json({ error: 'Error during property creation' });
    } else {
      const createdProperty = result.rows[0];

      console.log(createdProperty.photo_urls);

      res.status(201).json({
        id: createdProperty.id,
        title: createdProperty.title,
        description: createdProperty.description,
        price: createdProperty.price,
        location: createdProperty.location,
        property_type: createdProperty.property_type,
        area: createdProperty.area,
        transaction_status: createdProperty.transaction_status,
        user_id: createdProperty.user_id,
        photo_urls: createdProperty.photo_urls, // Return the photo URLs as an array
      });
    }
  });
};



const addComment = async (req, res) => {
  const { content } = req.body;
  const userId = req.params.user_id;

  try {
    const createdAt = new Date();

    const query = `
      INSERT INTO comments (user_id, content, created_at) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;

    const result = await pool.query(query, [userId, content, createdAt]);

    res.status(201).json({ comment: result.rows[0] });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRandomProperties = async (req, res) => {
  try {
    const { limit = 5, property_type } = req.query;

    let query = 'SELECT * FROM property';

    if (property_type) {
      query += ` WHERE property_type = $1`;
    }

    query += ` ORDER BY RANDOM() LIMIT $${property_type ? 2 : 1}`;

    const values = property_type ? [property_type, limit] : [limit];

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving random properties', err);
    res.status(500).json({ error: 'Error retrieving random properties' });
  }
};

const getRandomComments = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM comments ORDER BY RANDOM() LIMIT 5`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving random comments:', err);
    res.status(500).json({ error: 'Error retrieving random comments' });
  }
};

// const authenticate = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(403).json({ message: 'Token required' });

//   jwt.verify(token, 'your-secret-key', (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.user = user;
//     next();
//   });
// };

const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM property WHERE id = $1', [id]);

    if (result.rowCount > 0) {
      return res.json({ message: 'Property deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while deleting the property' });
  }
};

const addLike = async (req, res) => {
  const { user_id, property_id } = req.body;

  try {
    await pool.query('BEGIN');

    const result = await pool.query(
      'INSERT INTO likes (user_id, property_id) VALUES ($1, $2) RETURNING id',
      [user_id, property_id]
    );

    if (result.rowCount > 0) {
      await pool.query(
        'UPDATE property SET likes_count = likes_count + 1 WHERE id = $1',
        [property_id]
      );

      await pool.query('COMMIT');

      return res.status(201).json({ message: 'Like added successfully', likeId: result.rows[0].id });
    } else {
      await pool.query('ROLLBACK');
      return res.status(400).json({ message: 'Failed to add like' });
    }
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while adding the like' });
  }
};

const saveProperty = async (req, res) => {
  const { user_id, property_id } = req.body;

  try {
    await pool.query('BEGIN');

    const result = await pool.query(
      'INSERT INTO saved_posts (user_id, property_id) VALUES ($1, $2) RETURNING id, saved_at',
      [user_id, property_id]
    );

    if (result.rowCount > 0) {
      await pool.query('COMMIT');

      return res.status(201).json({
        message: 'Property saved successfully',
        savedPostId: result.rows[0].id,
        savedAt: result.rows[0].saved_at
      });
    } else {
      await pool.query('ROLLBACK');
      return res.status(400).json({ message: 'Failed to save property' });
    }
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while saving the property' });
  }
};


const his = async (req, res) => {
  const { property_id, buyer_email, new_status } = req.body;
  
  console.log('Starting transaction processing...');

  try {
    const buyerResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [buyer_email]
    );

    if (buyerResult.rowCount === 0) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    const buyer_id = buyerResult.rows[0].id;

    console.log('Buyer retrieved, buyer_id:', buyer_id);

    const updatePropertyResult = await pool.query(
      'UPDATE property SET buyer_id = $1, transaction_status = $2 WHERE id = $3 RETURNING id',
      [buyer_id, new_status, property_id]
    );

    if (updatePropertyResult.rowCount === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    console.log('Property updated successfully');

    const checkSavedPostResult = await pool.query(
      'SELECT * FROM saved_posts WHERE property_id = $1 AND user_id = $2',
      [property_id, buyer_id]
    );

    if (checkSavedPostResult.rowCount === 0) {
      await pool.query(
        'INSERT INTO saved_posts (user_id, property_id, saved_at) VALUES ($1, $2, NOW())',
        [buyer_id, property_id]
      );
      console.log('Saved post inserted');
    } else {
      console.log('Saved post already exists, no insertion needed');
    }

    return res.status(200).json({ message: 'Transaction completed successfully' });

  } catch (err) {
    console.error('Error processing transaction:', err);
    return res.status(500).json({ message: 'An error occurred while processing the transaction' });
  }
};


const updateProperty = async (req, res) => {
  const { property_id, buyer_id, new_status } = req.body;

  try {
    // Update the property status and set the buyer_id
    const updatePropertyResult = await pool.query(
      'UPDATE property SET buyer_id = $1, transaction_status = $2 WHERE id = $3 RETURNING id',
      [buyer_id, new_status, property_id]
    );

    // Check if the property was found and updated
    if (updatePropertyResult.rowCount === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    return res.status(200).json({
      message: 'Property status updated successfully',
      propertyId: updatePropertyResult.rows[0].id
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred' });
  }
};


const createMessage = async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  const query = `
    INSERT INTO messages (sender_id, receiver_id, content)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [sender_id, receiver_id, content];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating message:', err);
    res.status(500).json({ error: 'Failed to create message' });
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
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

module.exports = { signup, his, createMessage, getMessages, saveProperty, login, addLike, authenticate, createPostForProperty, addComment, cc, zz, deleteProperty, getRandomProperties, getRandomComments };