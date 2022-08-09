//On exporte tout ce qui nous sera nécéssaire pour cérer nos routes
const express = require('express');
const router = express.Router();
//const commentCtrl = require("../controllers/comment");
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");



//On créer nos routes pour gérer les commentaires
/*router.get("/:id/allComments", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.post("/:id", auth, commentCtrl.createComment);
router.delete("/:id", auth, commentCtrl.deleteComment);*/


//On créer les routes pour gérer publications
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.updatePost);
//router.get("/images/:id", auth, postCtrl.getOneImage);


//On créer les routes pour gérer les likes
router.patch("/:id/likes", auth, postCtrl.likes);
/*router.post("/:id/postLike", auth, postCtrl.postLike);
router.post("/:id/likes", auth, postCtrl.countLikes);*/


module.exports = router;