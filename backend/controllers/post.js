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

/*exports.downloadImage = (req, res, next) => {
   //On commencer par parser notre objet pour l'utiliser avec multer
    const postObjet = JSON.parse(req.body.post);
    //On supprime les données qui seront générées automatiquement
    const images = new images ({
        userId: req.body.userId,
        userName: req.body.userName,
        imageUrl: req.body.imageUrl ?  `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`: "",
    })
    
   
    //On enregistre notre objet dans la base de donnée
    images.save()
    .then(() => res.status(201).json({message : 'Publication enregistrée'}))
    .catch(error => res.status(400).json({ error }));

};*/

//On créer et exporte le controllers nous permettant de créer un post
exports.createPost = (req, res, next) => {
    //On commencer par parser notre objet pour l'utiliser avec multer
    const postObjet = req.body.post;   
    
    //let extension = req.body.imageUrl.split(".")[1];
    let base64Image = req.body.file.replace(`data:${req.body.typeFile};base64,`, "");
    let buff = Buffer.from(base64Image, 'base64');
    console.log("base à transformer", base64Image)
    fs.writeFileSync(`./images/${req.body.imageUrl}`, buff);


    //On créer donc notre objet avec les données remplis, on génére notre url d'images, on met les compteurs de like à 0 et les tableaux usersLiked vides
    const post = new Post({
        ...postObjet,
        userId: req.body.userId,
        userName: req.body.userName,
        imageUrl: req.body.imageUrl ?  `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`: "",
        like: 0,
        date: req.body.date,
        description: req.body.description,
        dislike: 0,
        usersLiked: [],
        usersDisliked: [],
        file: req.body.file
      });

     
      /*data        = fs.readFileSync('base64', 'utf8'),
      base64Data,
      binaryData;
      base64Data  =   data.replace(/^data:image\/png;base64,/, "");
      base64Data  +=  base64Data.replace('+', ' ');
      binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
      
      fs.writeFile(`./images/${req.body.imageUrl}`, binaryData, "binary", function (err) {
          console.log(err); // writes out file without error, but it's not a valid image
      });*/


      /*const url = 'data:image/png;base6....';
      fetch(req.body.file)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `./images/${req.body.imageUrl}`,{ type: "image/png" })
        })*/



      /*let base64Image = req.body.file.replace(/^data:image\/png;base64,/, "");
      let buff = Buffer.from(base64Image, 'base64');
      fs.writeFileSync(`./images/${req.body.imageUrl}`, buff);*/
      /*fs.writeFile(`./images/${req.body.imageUrl}`, base64Image, 'base64', function(err) {
        console.log('File created');
    });*/
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
  
//On créer et exporte le controller nous permettant de gérer les likes de notre base de donnée
exports.like = (req, res, next) => {
    let like = req.body.like;
    const userId = req.body.userId;
    const postId = req.body.postId;
    let dislike = req.body.dislike;
    const usersLiked = req.body.usersLiked;
    const usersDisliked = req.body.usersDisliked;

  //Si  l'utilisateur appuis sur j'aime mais à déja liké
    if (usersLiked.includes(userId)) {
      Post.findOne({_id: req.params.id})
        .then((post) => {
          Post.updateOne (
            { _id: postId},
            { description: req.body.description,
              userName: req.body.userName,
              userId: req.body.userId
            }
          )
          post.like = post.like - 1;
          post.usersLiked.pull(req.body.userId);
          like = like - 1;
          delete usersLiked[req.body.userId];

          post.save()
          .then(() => res.status(200).json({message: "publication déjà liké et unliké"}))
          .catch((error) => res.status(400).json({ error }))
        }) 
      .catch(error => res.status(400).json({ error }));
    //Si il appuis sur j'aime sans avoir liké avant
    } else {
      //Soit il a déjà mis un je n'aime pas
      if (usersDisliked.includes(userId)) {
        Post.findOne({_id: req.params.id})
          .then((post) => {
            Post.updateOne (
              { _id: postId},
              { description: req.body.description,
                userName: req.body.userName,
                userId: req.body.userId
              }
            )
            post.like = post.like + 1;
            post.dislike = post.dislike - 1;
            post.usersLiked.push(req.body.userId);
            post.usersDisliked.pull(req.body.userId);
            like = like + 1;
            dislike = dislike - 1;
            usersLiked.push(req.body.userId);
            delete usersDisliked[req.body.userId];

            post.save()
            .then(() => res.status(200).json({message: "j'aime ajouté et je n'aime pas supprimé"}))
            .catch((error) => res.status(400).json({ error }))
          })
          .catch(error => res.status(400).json({ error }));
      //soit, il n'a ni mis j'aime ni mis je n'aime pas
      } else {
        Post.findOne({_id: req.params.id})
          .then((post) => {
            Post.updateOne (
              { _id: postId},
              { description: req.body.description,
                userName: req.body.userName,
                userId: req.body.userId
              }
            )
            post.like = post.like + 1;
            post.usersLiked.push(req.body.userId);
            like = like + 1;
            usersLiked.push(req.body.userId);

            post.save()
          .then(() => res.status(200).json({message: "j'aime ajouté"}))
          .catch((error) => res.status(400).json({ error }))
          })
        .catch(error => res.status(400).json({ error }));
      }
    }
};

//On créer et exporte le controller nous permettant de gérer les likes de notre base de donnée
exports.dislike = (req, res, next) => {
  let like = req.body.like;
  const userId = req.body.userId;
  const postId = req.body.id;
  let dislike = req.body.dislike;
  const usersLiked = req.body.usersLiked;
  const usersDisliked = req.body.usersDisliked;

//Si l'utilisateur a déja mis un je n'aime pas
  if (usersDisliked.includes(userId)) {
    Post.findOne({_id: req.params.id})
      .then((post) => {
        Post.updateOne(
          { _id: postId},
          { description: req.body.description,
            userName: req.body.userName,
            userId: req.body.userId 
          }
        )
        post.dislike = post.dislike - 1;
        post.usersDisliked.pull(req.body.userId);
        dislike = dislike - 1;
        delete usersDisliked[req.body.userId];

        post.save()
        .then(() => res.status(200).json({message: "publication déjà unliké"}))
        .catch((error) => res.status(400).json({ error }))
      })
     .catch(() => res.status(400).json( "publication déjà disliké"))
  //Si l'utilisateur n'a pas mis un je n'aime pas
  } else {
    // Si l'utilisateur n'a pas mis un je n'aime pas, mais à mis un j'aime 
    if (usersLiked.includes(userId)) {
      Post.findOne({_id: req.params.id})
        .then((post) => {
          Post.updateOne (
            { _id: postId},
            { description: req.body.description,
              userName: req.body.userName,
              userId: req.body.userId
            }
          )
          post.dislike = post.dislike + 1;
          post.like = post.like - 1;
          post.usersDisliked.push(req.body.userId);
          post.usersLiked.pull(req.body.userId);
          dislike = dislike + 1;
          like = like - 1;
          usersDisliked.push(req.body.userId);
          delete usersLiked[req.body.userId];

          post.save()
          .then(() => res.status(200).json({message: "j'aime retiré et je n'aime pas ajouté"}))
          .catch((error) => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }));
    //Si l'utilisateur n'a mis ni j'aime ni je n'aime pas
    } else {
      Post.findOne({_id: req.params.id})
        .then((post) => {
          Post.updateOne (
            { _id: postId},
            { description: req.body.description,
              userName: req.body.userName,
              userId: req.body.userId
            }
          )
          post.dislike = post.dislike + 1;
          post.usersDisliked.push(req.body.userId);
          dislike = dislike + 1;
          usersDisliked.push(req.body.userId);

          post.save()
          .then(() => res.status(200).json({message: "je n'aime pas ajouté"}))
          .catch((error) => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }));
    }
  }
};   