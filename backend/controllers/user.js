//router.get("/images/:id", auth, userCtrl.getProfilPicture);
const User = require('../models/user');
const fs = require('fs');


//On créer et on exporte le controller nous permettant de voir un utilisateur en particulier
exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }))
    };

//On créer et exporte le controller nous permettant de modifier un utilisateur
exports.updateOneUser = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then((user) => {
      const dateAndImageName = `${Date.now()}${req.body.imageUrl}`;
      //On convertie notre image de la base64 en fichier lisible par notre serveur
      if (req.body.file === undefined || req.body.file === null){
      } else {
      //On convertie notre image de la base64 en fichier lisible par notre serveur
      let base64Image = req.body.file.replace(`data:${req.body.typeFile};base64,`, "");
    
      let buff = Buffer.from(base64Image, 'base64');
      fs.writeFileSync(`./images/${dateAndImageName}`, buff);}
      console.log()
      //On commence par regarder si il ya un champs file dans notre requete
      const userProfil = req.file ? {
          //Si c'est le cas, on parse notre chaine de caractère et on recréer l'url de l'image
          ...JSON.parse(req.body.post),
          imageUrl: req.body.imageUrl ?  `${req.protocol}://${req.get('host')}/images/${dateAndImageName}`: "",
        } : {...req.body};  //Sinon on récupère l'objet directement dans le corps de la requète
        //ensuite on supprime le userId venant de la requete pour éviter que quelqu'un créer un objet a son puis le modifie pour le reassigner à une autre personne
        delete userProfil._userId;
         
          if (req.body.userName === ""){
            user.userName = user.userName,
            user.imageUrl = req.body.imageUrl ? `${req.protocol}://${req.get('host')}/images/${dateAndImageName}`: ""
          } else {
            user.userName = req.body.userName,
            user.imageUrl = req.body.imageUrl ?  `${req.protocol}://${req.get('host')}/images/${dateAndImageName}`: ""
          }
          
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateurs modifié !'}))
        .catch(error => res.status(400).json({ error}))
      })
    .catch(error => res.status(400).json({ error }));
};

//On créer notre controllers pour afficher tous les utilisateurs
exports.getAllUsers = (req, res, next) => { 
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
  };