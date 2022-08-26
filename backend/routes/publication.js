//On exporte tout ce qui nous sera nécéssaire pour cérer nos routes
const express = require('express');
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");



//On créer nos routes pour gérer les commentaires
/*router.get("/:id/allComments", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.post("/:id", auth, commentCtrl.createComment);
router.delete("/:id", auth, commentCtrl.deleteComment);*/


//On créer les routes pour gérer publications
router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.post("/create",multer, auth, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.updatePost);
//router.post("/images", multer, postCtrl.downloadImage);


//On créer les routes pour gérer les likes
router.post("/:id/likes/like",auth, postCtrl.like);
router.post("/:id/likes/dislike",auth, postCtrl.dislike);
/*router.post("/:id/postLike", auth, postCtrl.postLike);
router.post("/:id/likes", auth, postCtrl.countLikes);*/


module.exports = router;