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

    //On commence par regarder si il ya un champs file dans notre requete
    const userProfil = req.file ? {
        //Si c'est le cas, on parse notre chaine de caractère et on recréer l'url de l'image
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : {...req.body};  //Sinon on récupère l'objet directement dans le corps de la requète
  
      //ensuite on supprime le userId venant de la requete pour éviter que quelqu'un créer un objet a son puis le modifie pour le reassigner à une autre personne
      delete userProfil._userId;
  
      //ensuite on cherche notre objet dans la base deonnée pour vérifier que ce soit bien l'utilisateur qui a créer l'objet qui veut le modifier
      User.findOne({_id: req.params.id})
      .then((user) => {
        //si ce n'est pas le même utilisateur alors message disant que la personne n'est pas autorisé
        if (user.userId != req.auth.userId) {
          req.status(401).json({ message : 'Non-autorisé'});
          //Sinon on met a jour l'enregistrement de l'objet avec l'id
        } else {
          User.updateOne({ _id: req.params.id}, {...userProfil, _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Profil modifié'}))
          .catch(error => res.status(401).json({ error}));
        };
      })
      .catch(error => res.status(400).json({ error }));
  };

  exports.getAllUsers = (req, res, next) => {
    
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
    };