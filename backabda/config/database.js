const { Sequelize } = require('sequelize');

// Initialiser une nouvelle instance de Sequelize
const sequelize = new Sequelize('gestion_notes', 'root', '', {
  host: 'localhost', // Adresse de votre serveur MySQL
  dialect: 'mysql', // Le dialecte de la base de données que vous utilisez
});

module.exports = sequelize;
