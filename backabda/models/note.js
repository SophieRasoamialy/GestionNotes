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

Note.belongsTo(Etudiant, { foreignKey: 'etudiant_id', targetKey: 'etudiant_id' });
Note.belongsTo(Matiere, { foreignKey: 'matiere_id', targetKey: 'matiere_id' });


module.exports = Note;
