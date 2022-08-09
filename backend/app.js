//On importe express, MongoDb, path
const express = require('express'); //Framework basé sur node.js
const app = express(); //l'application qui utilise le framework
const mongoose = require('mongoose'); //pour se connecter à mongoDb
const path = require('path'); //sert pour charger les photos
const bodyParser = require('body-parser'); //Permet d'extraire l'objet JSON des requettes POST (depuis l'appli frontend)
const listEndpoints = require('express-list-endpoints');

//On importe nos différentes routes pour l'authentification
const authRoutes = require('./routes/auth');
const publicationRoutes = require('./routes/publication');

//On se connecte à MongoDb et on vérifie avec un console.log
mongoose.connect("mongodb+srv://MA-antoine:Projet6@cluster0.sxjbyjp.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use(express.json());

  //On ajouter des headers à notre réonse pour pouvoir communiquer entre nos serveurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // ressources peuvent être partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //entetes utilisées 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Méthode autorisées
    res.setHeader('Content-Security-Policy', "default-src 'self'"); //Fourni des scripts pour la page visitées
    next();
  });


  //On transforme les données de la requet POST en objet JSON exploitable
  app.use(bodyParser.json());

  //On enregistre les routes ici
  app.use('/api/publication', publicationRoutes);
  app.use('/api/auth', authRoutes);

  //On créer la route pour les images avec express
  app.use('/images', express.static(path.join(__dirname, 'images')))
  console.log(listEndpoints(app));

module.exports = app;