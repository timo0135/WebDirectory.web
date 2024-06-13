const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servir les fichiers statiques
app.use(express.static(__dirname));

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
