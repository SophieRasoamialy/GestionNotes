const Note = require('../models/note');
const Matiere = require('../models/matiere');
const Etudiant = require('../models/etudiant');

// Create
exports.createNote = async (req, res) => {
  try {
    const { etudiant_id, matiere_id, note } = req.body;
    console.log(note);
    const newNote = await Note.create({ etudiant_id, matiere_id, note });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

// Read
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [
        { model: Etudiant, attributes: ['etudiant_id', 'etudiant_nom'] },
        { model: Matiere, attributes: ['matiere_id', 'matiere_design'] }
      ],
      attributes: ['etudiant_id', 'matiere_id', 'note'],

      order: [['createdAt', 'DESC']] 

    });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update
exports.updateNote = async (req, res) => {
  try {
    const { etudiant_id, matiere_id } = req.params;
    const { note } = req.body;
    const [updated] = await Note.update({ note }, {
      where: { etudiant_id, matiere_id }
    });
    if (updated) {
      const updatedNote = await Note.findOne({ where: { etudiant_id, matiere_id } });
      res.status(200).json(updatedNote);
    } else {
      throw new Error('Note non trouvée');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteNote = async (req, res) => {
  try {
    const { etudiant_id, matiere_id } = req.params;
    const deleted = await Note.destroy({
      where: { etudiant_id, matiere_id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Note non trouvée');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
