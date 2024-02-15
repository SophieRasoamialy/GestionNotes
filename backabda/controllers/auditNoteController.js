const AuditNote = require('../models/audit_note');

// Liste des audits de notes
exports.listAuditNotes = async (req, res) => {
  try {
    const auditNotes = await AuditNote.findAll({
      order: [['id', 'DESC']] // Ordonner par ID décroissant
    });
    res.status(200).json(auditNotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
