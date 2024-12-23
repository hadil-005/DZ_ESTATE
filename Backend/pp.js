const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const userRoutes = require('./route');
const bodyParser = require('body-parser');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const filename = Date.now() + fileExtension;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});

app.post('/upload', upload.array('photos', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No photos uploaded' });
  }

  const photoUrls = req.files.map(file => `/uploads/${file.filename}`);
  res.status(200).json({ message: 'Files uploaded successfully', photoUrls });
});

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/comments', userRoutes);
app.use('/api/property', userRoutes);
app.use('/api/history', userRoutes);
app.use('/api/messeges', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
