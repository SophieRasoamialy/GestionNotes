const Matiere = require('../models/matiere');
const Note = require('../models/note');

// Create
exports.createMatiere = async (req, res) => {
  try {
    const { matiere_design, matiere_coef } = req.body;
    const matiere = await Matiere.create({ matiere_design, matiere_coef });
    res.status(201).json(matiere);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
exports.getMatiere = async (req, res) => {
  try {
    const matieres = await Matiere.findAll(
      {
        order: [['matiere_id', 'DESC']]
      }
    );
    res.status(200).json(matieres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateMatiere = async (req, res) => {
  try {
    const { matiere_id } = req.params;
    const { matiere_design, matiere_coef } = req.body;
    const [updated] = await Matiere.update({ matiere_design, matiere_coef }, {
      where: { matiere_id }
    });
    if (updated) {
      const updatedMatiere = await Matiere.findOne({ where: { matiere_id } });
      res.status(200).json(updatedMatiere);
    } else {
      throw new Error('Matiere non trouvée');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteMatiere = async (req, res) => {
  try {
    const { matiere_id } = req.params;
    // Supprimer toutes les notes associées à la matière
    await Note.destroy({
      where: { matiere_id }
    });
    // Ensuite, supprimer la matière
    const deletedMatiere = await Matiere.destroy({
      where: { matiere_id }
    });
    if (deletedMatiere) {
      res.status(204).send();
    } else {
      throw new Error('Matiere non trouvée');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};