const mongoose = require('mongoose');

//Constante nous permettant de nous assurer que deux  utilisateurs ne peuvent utiliser la même adresse 
const uniqueValidator = require('mongoose-unique-validator');

//Const nous permettant de stocker des infos sur l'utilisateur dans notre base de données
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, minLength: 6},
    admin: { type: Boolean, default: false }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);