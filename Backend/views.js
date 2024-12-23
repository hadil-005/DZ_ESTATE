const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

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

    res.status(201).json({ message: 'User signed up successfully', user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const findUserQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(findUserQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password or email' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

  // Map the uploaded files to URLs
  const photoUrls = req.files.map(file => `/uploads/${file.filename}`);
  
  // Log to ensure photoUrls is correctly populated
  console.log(photoUrls);

  // SQL query to insert property with photo URLs as an array
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

      // Log the result to ensure photo_urls is correctly returned
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
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token required' });

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

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

  try {
    const buyerResult = await pool.query(
      'SELECT id, first_name, family_name FROM users WHERE email = $1',
      [buyer_email]
    );

    if (buyerResult.rowCount === 0) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    const buyer_id = buyerResult.rows[0].id;
    const buyer_first_name = buyerResult.rows[0].first_name;
    const buyer_family_name = buyerResult.rows[0].family_name;

    const updatePropertyResult = await pool.query(
      'UPDATE property SET buyer_id = $1, transaction_status = $2 WHERE id = $3 RETURNING id',
      [buyer_id, new_status, property_id]
    );

    if (updatePropertyResult.rowCount === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while processing the transaction' });
  }
};
// const property_id_updated = updatePropertyResult.rows[0].id;


// const insertHistoryResult = await pool.query(
//   'INSERT INTO history (user_id, property_ids) VALUES ($1, $2) RETURNING id, interacted_at',
//   [buyer_id, [property_id_updated]]
//  );

//  try { 
//   if (insertHistoryResult.rowCount > 0) {
//   return res.status(200).json({
//     message: 'Property status updated successfully',
//     historyId: insertHistoryResult.rows[0].id,
//     interactedAt: insertHistoryResult.rows[0].interacted_at
//   });
//  } else {
//   return res.status(500).json({ message: 'Failed to record history' });
//  }
//  } catch (err) {
//   console.error(err);
//   return res.status(500).json({ message: 'An error occurred' });
// }
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
