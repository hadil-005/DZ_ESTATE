const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const userRoutes = require('./route');
const bodyParser = require('body-parser');
const upload =  require('./route');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

app.use(cookieParser()); 
app.use(express.json());
app.use(bodyParser.json());

app.post('/logout', (req, res) => {
  res.clearCookie('token');  // Clears the token cookie
  res.status(200).json({ message: 'Logged out successfully' });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); }
});


// app.post('/upload', upload.array('photos', 10), (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ error: 'No photos uploaded' });
//   }

//   const photoUrls = req.files.map(file => `/uploads/${file.filename}`);
//   res.status(200).json({ message: 'Files uploaded successfully', photoUrls });
// });


app.use('/api/users', userRoutes);
app.use('/api/comments', userRoutes);
app.use('/api/property', userRoutes);
app.use('/api/history', userRoutes);
app.use('/api/messeges', userRoutes);

const PORT = 3303;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
