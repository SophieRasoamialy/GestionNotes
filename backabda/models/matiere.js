// matiere.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Matiere = sequelize.define('matiere', {
    matiere_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  matiere_design: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matiere_coef: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Matiere;
