const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Routes pour les notes
router.post('/notes', noteController.createNote); // Créer une nouvelle note
router.get('/notes', noteController.getNotes); // Récupérer toutes les notes
router.put('/notes/:etudiant_id/:matiere_id', noteController.updateNote); // Mettre à jour une note
router.delete('/notes/:etudiant_id/:matiere_id', noteController.deleteNote); // Supprimer une note
router.get('/notes/matiere/:matiere_id', noteController.getNotesParMatiere);

module.exports = router;
