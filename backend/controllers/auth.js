//On importe bcrypt pour hasher les mdp, jwt pour les tokens
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
//On récupère notre models user avec notre shéma mongoose
const User = require('../models/user');


// Fonction pour l'inscription de l'utilisateur
exports.signup = (req, res, next) => {
    //On utilise bcrypt pour hasher les mdp et on le sale 10 fois pour être sûr qu'ils soient difficillement déchiffrable
    bcrypt.hash(req.body.password, 10)
    //On récupère le hash et on va créer un nouvel utilisateur
    .then(hash => {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            admin: false,
        });
        //On enregistre l'utilisateur dans la base de données
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateurs créé !'}))
        .catch(error => res.status(400).json({ error}))
    })
    .catch(error => res.status(500).json({ error}));
};

//Fonction pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
    //On cherche l'utilisateur dans la base de donnée qui coorespond à l'email entré
    User.findOne({ email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Paire identifiant/mdp incorrecte'})
        }
            //On utilise la fonction compare pour vérifier que nos hash proviennent du même mdp de base
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Paire identifiant/mdp incorrecte'})
                } 
                res.status(200).json({
                    userId: user._id,
                    //On rajoute des tokens d'authentification pour augmenter la sécurité
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET_25h69B87uov1',
                        { expiresIn: '24h'}
                    )
                });  
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Fonction pour supprimer un utilisateur
exports.deleteAccount = (req, res, next) => {
    User.findOne({ email: req.body.email})
      .then((user) => {
        if (user.imageUrl !== null) {
          // Si photo de profil présente on la supprime du répertoire, puis on supprime l'user de la BDD
          const filename = user.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            db.User.destroy({ where: { id: req.params._id } });
            res.status(200).json({ message: "Compte supprimé !" });
          });
        } else { // Sinon on supprime uniquement l'user
          db.User.destroy({ where: { id: req.params.id } });
          res.status(200).json({ message: "Compte supprimé !" });
        }
      })
  
      .catch((error) => res.status(500).json({ error }));
  };

//Fonction pour se deconnecter
exports.logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json("déconnecté");
  };