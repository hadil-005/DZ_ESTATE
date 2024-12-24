const express = require('express');
const { signup, login,getMessages,getit , createMessage, createPostForProperty,saveProperty, his ,addLike ,authenticate,  deleteProperty ,addComment, cc, zz ,getRandomProperties } = require('./views');
const router = express.Router();
const multer = require('multer');
const path = require('path');





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
router.get('/home/', getit);


router.post('/createMessage', createMessage); 

router.get('/getMessages', getMessages);  

router.delete('/:id/deleteit', deleteProperty);
module.exports = router;