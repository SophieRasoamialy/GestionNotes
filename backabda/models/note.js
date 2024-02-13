// note.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Etudiant = require('./etudiant');
const Matiere = require('./matiere');

const Note = sequelize.define('note', {
    etudiant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Etudiant,
      key: 'etudiant_id'
    }
  },
  matiere_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Matiere,
      key: 'matiere_id'
    }
  },
  note: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 20
    }
  }
});

module.exports = Note;
