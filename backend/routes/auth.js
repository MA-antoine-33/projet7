//On exporte tout ce qui nous sera nécéssaire pour cérer nos routes
const express = require('express');
const router = express.Router();
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


//On créer nos routes pour créer un compte, se connecter, se déconnecter et désactiver son compte
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);


//On créer les routes pour gérer son profil 
router.get("/:id",  userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.put("/:id", auth, multer, userCtrl.updateOneUser);


module.exports = router;