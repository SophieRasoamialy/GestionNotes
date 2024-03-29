const express = require('express');
const router = express.Router();
const auditNoteController = require('../controllers/auditNoteController');

// Route pour la liste des audits de notes
router.get('/audit_notes', auditNoteController.listAuditNotes);
router.get('/audit_stats', auditNoteController.getAuditStats);



module.exports = router;
