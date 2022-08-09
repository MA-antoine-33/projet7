//On importe MongoDb
const mongoose = require('mongoose');
//...
const { stringify } = require('querystring');

//On créer notre shéma de donnée ou on liste les différents champs dont notre objet aura besoin
const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Number },
    like: { type: Number },
    dislike: { type: Number},
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});

//On exporte notre schéma en tant que Post
module.exports = mongoose.model('Post', postSchema);