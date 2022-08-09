//On récupère le package jsonwebtoken
const jwt = require('jsonwebtoken');


//Ici on vérifie si notre token est valide
module.exports = (req, res, next) => {
    try {
        //On récupère notre token dans le header "authorization"
        const token = req.headers.authorization.split(' ')[1];
        //On vérifie notre token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET_25h69B87uov1');
        //On récupère l'id et on l'extrait pour opouvoir l'utiliser dans nos différentes routes
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};