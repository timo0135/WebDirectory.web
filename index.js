const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Définir le dossier public comme source de fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
