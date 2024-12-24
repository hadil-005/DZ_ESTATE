const express = require('express');
const { signup, login,getMessages,createMessage, createPostForProperty,saveProperty, his ,addLike ,authenticate,  deleteProperty ,addComment, cc, zz ,getRandomProperties } = require('./views');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Max file size 5MB


router.post('/signup', signup);
router.post('/login', login);
router.post('/zz', createPostForProperty);
// router.post('/:user_id/prop', upload.array('photos', 5), createPostForProperty);
router.post('/:user_id/comment', addComment);

router.get('/random', getRandomProperties);
router.get('/randomp', getRandomProperties);
router.get('/randomc', getRandomProperties);
// router.post('/:user_id/cc', upload.array('photos', 5), zz);
router.post('/like', addLike);
router.post('/save', saveProperty);

router.post('/userhis' , his);


router.post('/createMessage', createMessage); 

router.get('/getMessages', getMessages);  

router.delete('/:id/deleteit', deleteProperty);
module.exports = router;