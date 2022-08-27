//On exporte tout ce qui nous sera nécéssaire pour cérer nos routes
const express = require('express');
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


//On créer les routes pour gérer publications
router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.post("/create", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.updatePost);


//On créer les routes pour gérer les likes
router.post("/:id/likes/like",auth, postCtrl.like);
router.post("/:id/likes/dislike",auth, postCtrl.dislike);


module.exports = router;