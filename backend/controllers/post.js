//router.get("/images/:id", auth, postCtrl.getOneImage);
//router.patch("/:id/likes", auth, postCtrl.likes);
//router.post("/:id/postLike", auth, postCtrl.postLike);
//router.post("/:id/likes", auth, postCtrl.countLikes);
const Post = require('../models/publication');
const fs = require('fs');
const User = require('../models/user');
const jwt = require ('jsonwebtoken');
const user = require('../models/user');
const { post } = require('../routes/publication');



//On créer et on exporte le controller nous permettant de voir un post en particulier e
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }))
    };
  
  
  //On créer et exporte le controller nous permettant de voir l'ensemble des posts existantes dans un array
exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
      };

//On créer et exporte le controllers nous permettant de créer un post
exports.createPost = (req, res, next) => {
  
  
    //On commencer par parser notre objet pour l'utiliser avec multer
    /*const postObjet = JSON.parse(req.body.post);
    //On supprime les données qui seront générées automatiquement
    delete postObjet._id;
    delete postObjet._userId;*/
  
    //On créer donc notre objet avec les données remplis, on génére notre url d'images, on met les compteurs de like à 0 et les tableaux usersLiked vides
    const post = new Post({
        //...postObjet,
        userId: req.body.userId,
        userName: req.body.userName,
        imageUrl: req.body.imageUrl ?  `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`: "",
        like: 0,
        date: req.body.date,
        description: req.body.description,
        dislike: 0,
        usersLiked: [],
        usersDisliked: []
      });
      //On enregistre notre objet dans la base de donnée
      post.save()
      .then(() => res.status(201).json({message : 'Publication enregistrée'}))
      .catch(error => res.status(400).json({ error }));
    
    
  };

//On créer et exporte le middelware nous permettant de modifier un post existant
exports.updatePost = (req, res, next) => {
    //On commence par regarder si il ya un champs file dans notre requete
    const postObjet = req.file ? {
        //Si c'est le cas, on parse notre chaine de caractère et on recréer l'url de l'image
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : {...req.body};  //Sinon on récupère l'objet directement dans le corps de la requète
  
      //ensuite on supprime le userId venant de la requete pour éviter que quelqu'un créer un objet a son puis le modifie pour le reassigner à une autre personne
      delete postObjet._userId;
  
      if (Post.findOne({admin: true})) {
        Post.findOne({_id: req.params.id})
        .then((post) => {
            Post.updateOne({ _id: req.params.id}, {...postObjet, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Publication modifiée'}))
            .catch(error => res.status(401).json({ error}));
          }
      )
      .catch(error => res.status(400).json({ error }));
      }else{
      //ensuite on cherche notre objet dans la base deonnée pour vérifier que ce soit bien l'utilisateur qui a créer l'objet qui veut le modifier
      Post.findOne({_id: req.params.id})
      .then((post) => {
        if (req.params.admin === true) {
          Post.updateOne({ _id: req.params.id}, {...postObjet, _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Publication modifiée'}))
          .catch(error => res.status(401).json({ error}));
        } else {
        //si ce n'est pas le même utilisateur alors message disant que la personne n'est pas autorisé
        if (post.userId != req.auth.userId) {
          req.status(401).json({ message : 'Non-autorisé'});
          //Sinon on met a jour l'enregistrement de l'objet avec l'id
        } else {
          Post.updateOne({ _id: req.params.id}, {...postObjet, _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Publication modifiée'}))
          .catch(error => res.status(401).json({ error}));
        };}
      })
      .catch(error => res.status(400).json({ error }));
    }
  };
  

//On créer et exporte le middelware nous permettant de supprimer un post existante
exports.deletePost = (req, res, next) => {
  if (Post.findOne({admin: true})) {
    Post.findOne({_id: req.params.id})
    .then((post) => {
            //on commence par récuperer le nom de fichier de l'image à supprimer
            const filename = post.imageUrl.split('/images/')[1];
            //On utilise la fonction unlink de fs pour supprimer notre enregistrement de la base de donnée
            fs.unlink(`images/$images${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({ message: 'Publication supprimée'}))
                .catch(error => res.status(401).json({ error}));
            });
        })
  } else { //On commence par idenfier notre objet pour vérifier si l'id est le même que la personne qui a créé le post
    Post.findOne({_id: req.params.id})
    .then((post) => {
        //Si ce n'est pas le même id, la personne n'est pas autorisé à le supprimer
        if (post.userId != req.auth.userId) {
            req.status(401).json({ message : 'Non-autorisé'});
        } else {
            //sinon on commence par récuperer le nom de fichier de l'image à supprimer
            const filename = post.imageUrl.split('/images/')[1];
            //On utilise la fonction unlink de fs pour supprimer notre enregistrement de la base de donnée
            fs.unlink(`images/$images${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({ message: 'Publication supprimée'}))
                .catch(error => res.status(401).json({ error}));
          });
        };
    })
    .catch(error => res.status(500).json({ error }));}
  
   
  
  };
  
//On créer et exporte le controller nous permettant de gérer les likes et unliked de notre base de donnée
exports.likes = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;
    const postId = req.params.id;
 
     //condition quand on met un like
    if (like === 1) {
     Post.updateOne(
       { _id: postId},
       {   $push: {usersLiked: userId},
           $inc: {like: +1},
       })
       .then(() => res.status(200).json({message: "j'aime ajouté"}))
       .catch((error) => res.status(400).json({ error }))
    };
 
    //condition quand on met un dislike
    if (like === -1) {
     Post.updateOne(
       { _id: postId},
       {   $push: { usersDisliked: userId},
           $inc: { dislike: +1} 
       })
       .then(() => res.status(200).json({message: "je n'aime pas ajouté"}))
       .catch((error) => res.status(400).json({ error }))
    };
    
    //condition quand on annule un like ou dislike
    if (like === 0) {
     Post.findOne(
       { _id: postId})
       .then((post) => {
         //Si on veut annuler un like
         if (post.usersLiked.includes(userId)) {
           Post.updateOne(
             { _id: postId},
             {   $pull: { usersLiked: userId},
                 $inc: { like: -1} 
             })
             .then(() => res.status(200).json({message: "mention j'aime supprimé"}))
             .catch((error) => res.status(400).json({ error }))
         };
         //Si il s'agit d'un dislike
         if (post.usersDisliked.includes(userId)) {
           Post.updateOne(
             { _id: postId},
             {   $pull: { usersDisliked: userId},
                 $inc: { dislike: -1} 
             })
             .then(() => res.status(200).json({message: "mention je n'aime pas supprimé"}))
             .catch((error) => res.status(400).json({ error }))
         }
       })
       .catch((error) => res.status(400).json({ error }))
    }
 };