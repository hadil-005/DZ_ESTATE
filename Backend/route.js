const express = require("express");
const {
  signup,
  login,
  getget,
  getMessages,
  getit,
  createMessage,
  createeessage,
  getMessases,
  getLikedProperties,
  getSavedProperties,
  getThreeRandomProperties,
  searchProperties,
  logout,
  saveProperty,
  creaeeMessage,
  getPropertyDetails,
  his,
  addLike,
  authenticate,
  deleteProperty,
  addComment,
  cc,
  zz,
  getRandomProperties,
} = require("./views");
const router = express.Router();
const multer = require("multer");
const path = require("path");

router.post("/signup", signup);
router.post("/login", login);
router.post("/:user_id/comment", addComment);
router.post("/logout", logout);
//_________________________________________
router.get("/random", getRandomProperties);
router.get("/randomp", getRandomProperties);
router.get("/randomc", getRandomProperties);
// _______________________________________________________

router.delete("/:id/deleteit", deleteProperty);
router.post("/like", addLike);
router.post("/save", saveProperty);
router.post("/userhis", his);
router.post("/createMessage", createMessage);
router.get("/home", getit);
router.get("/searchProperties", searchProperties);
router.get("/getThreeRandomProperties", getThreeRandomProperties);
router.get("/:user_id/getLikedProperties", getLikedProperties);
router.get("/getPropertyDetails/:property_id", getPropertyDetails);
router.get("/:user_id/getSavedProperties", getSavedProperties);
router.post("/cmassage", creaeeMessage);

// Fetch messages between two users
router.get("/getget ", getget);

// ____________________________________________
// router.get("/getMessages", getMessases);
module.exports = router;
