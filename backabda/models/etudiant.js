// etudiant.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Etudiant = sequelize.define('etudiant', {
    etudiant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  etudiant_nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  etudiant_moyenne: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Etudiant;
