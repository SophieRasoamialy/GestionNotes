const Etudiant = require('../models/etudiant');

// Create
exports.createEtudiant = async (req, res) => {
  try {
    const { etudiant_nom, etudiant_moyenne } = req.body;
    const etudiant = await Etudiant.create({ etudiant_nom, etudiant_moyenne });
    res.status(201).json(etudiant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
exports.getEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.findAll();
    res.status(200).json(etudiants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateEtudiant = async (req, res) => {
  try {
    const { etudiant_id } = req.params;
    const { etudiant_nom, etudiant_moyenne } = req.body;
    const [updated] = await Etudiant.update({ etudiant_nom, etudiant_moyenne }, {
      where: { etudiant_id }
    });
    if (updated) {
      const updatedEtudiant = await Etudiant.findOne({ where: { etudiant_id } });
      res.status(200).json(updatedEtudiant);
    } else {
      throw new Error('Etudiant non trouvé');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteEtudiant = async (req, res) => {
  try {
    const { etudiant_id } = req.params;
    const deleted = await Etudiant.destroy({
      where: { etudiant_id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Etudiant non trouvé');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
