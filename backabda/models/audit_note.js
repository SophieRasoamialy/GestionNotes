// audit_note.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditNote = sequelize.define('audit_note', {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    operation_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_mise_a_jour: {
    type: DataTypes.DATE,
    allowNull: false
  },
  etudiant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  etudiant_nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  design: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note_ancien: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  note_nouveau: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  utilisateur: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = AuditNote;
