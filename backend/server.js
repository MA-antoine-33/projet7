//Ecoute des requettes http et de leurs réponses
const http = require('http');
const app = require('./app');

//On configure le port de connexion en fonction de l'envieronnement
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Si aucun port n'est déclaré, on écoutera le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


//On gere les différentes erreurs possible
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//On créer le server avec express
const server = http.createServer(app);

//On lance le serveur et on affiche sur que port se connecter, ou les erreurs possibles
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


//Le serveur écoute le port définit plus haut
server.listen(port);