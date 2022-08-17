const mongoose = require('mongoose');
const imageDefault = "http://localhost:4200/images/profil_par_default.jpg";


//Constante nous permettant de nous assurer que deux  utilisateurs ne peuvent utiliser la même adresse 
const uniqueValidator = require('mongoose-unique-validator');

//Const nous permettant de stocker des infos sur l'utilisateur dans notre base de données
const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]},
    password: { type: String, required: true, minLength: 6},
    imageUrl: { type: String, default: imageDefault },
    description: {type: String, default: "Ceci est la photo de profil"},
    admin: { type: Boolean, default: false }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);