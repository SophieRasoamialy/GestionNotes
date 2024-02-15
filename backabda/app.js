const express = require('express');
const bodyParser = require('body-parser');
const etudiantRoutes = require('./routes/etudiantRoutes');
const matiereRoutes = require('./routes/matiereRoutes');
const noteRoutes = require('./routes/noteRoutes');
const auditNoteRoutes = require('./routes/auditNoteRoutes');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();

// Configurer CORS
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Monter les routes
app.use('/api', etudiantRoutes);
app.use('/api', matiereRoutes);
app.use('/api', noteRoutes);
app.use('/api', auditNoteRoutes);

// Synchroniser la base de données
sequelize.sync()
  .then(() => {
    console.log('Base de données synchronisée');
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation de la base de données :', err);
  });

// Port d'écoute du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
