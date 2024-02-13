const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

// Routes pour les étudiants
router.post('/etudiants', etudiantController.createEtudiant); // Créer un nouvel étudiant
router.get('/etudiants', etudiantController.getEtudiants); // Récupérer tous les étudiants
router.put('/etudiants/:etudiant_id', etudiantController.updateEtudiant); // Mettre à jour un étudiant
router.delete('/etudiants/:etudiant_id', etudiantController.deleteEtudiant); // Supprimer un étudiant

module.exports = router;
