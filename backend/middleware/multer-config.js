//On importe multer qui permet de gérer les fichiers entrants dans les requetes HTTP
const multer = require('multer');

//On se créer un dictionnaire pour définir le format des images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

//On créer un objet pour stocker nos images 
const storage = multer.diskStorage({
    //On définit où on range nos images (dans le dossier images créé dans le backend)
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    //On définit quel nom de fichier on va donner pour éviter les problèmes de doublons de noms
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//On export notre mildderware avec notre objet storage
module.exports = multer({ storage: storage}).single('image');