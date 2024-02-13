const express = require('express');
const router = express.Router();
const matiereController = require('../controllers/matiereController');

// Routes pour les matières
router.post('/matieres', matiereController.createMatiere); // Créer une nouvelle matière
router.get('/matieres', matiereController.getMatiere); // Récupérer toutes les matières
router.put('/matieres/:matiere_id', matiereController.updateMatiere); // Mettre à jour une matière
router.delete('/matieres/:matiere_id', matiereController.deleteMatiere); // Supprimer une matière

module.exports = router;
