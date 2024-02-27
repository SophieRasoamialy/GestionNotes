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

exports.getAuditStats = async (req, res) => {
  try {
    const insertionCount = await AuditNote.count({ where: { operation_type: 'ajout' } });
    const updateCount = await AuditNote.count({ where: { operation_type: 'modification' } });
    const deletionCount = await AuditNote.count({ where: { operation_type: 'suppression' } });

    res.status(200).json({ insertionCount, updateCount, deletionCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
