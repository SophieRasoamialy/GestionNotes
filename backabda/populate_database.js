const Etudiant = require('./models/etudiant');
const Matiere = require('./models/matiere');
const Note = require('./models/note');

(async () => {
  try {
    // Peupler la table etudiant
    await Etudiant.bulkCreate([
      { etudiant_nom: 'Étudiant 1', etudiant_moyenne: 0 },
      { etudiant_nom: 'Étudiant 2', etudiant_moyenne: 0 },
      { etudiant_nom: 'Étudiant 3', etudiant_moyenne: 0 }
    ]);

    // Peupler la table matiere
    await Matiere.bulkCreate([
      { matiere_design: 'Mathématiques', matiere_coef: 2 },
      { matiere_design: 'Physique', matiere_coef: 3 },
      { matiere_design: 'Chimie', matiere_coef: 2 }
    ]);

    // Peupler la table note
    await Note.bulkCreate([
      // Insérer des notes aléatoires pour chaque étudiant et chaque matière
      { etudiant_id: 1, matiere_id: 1, note: Math.random() * 20 },
      { etudiant_id: 1, matiere_id: 2, note: Math.random() * 20 },
      { etudiant_id: 1, matiere_id: 3, note: Math.random() * 20 },
      { etudiant_id: 2, matiere_id: 1, note: Math.random() * 20 },
      { etudiant_id: 2, matiere_id: 2, note: Math.random() * 20 },
      { etudiant_id: 2, matiere_id: 3, note: Math.random() * 20 },
      { etudiant_id: 3, matiere_id: 1, note: Math.random() * 20 },
      { etudiant_id: 3, matiere_id: 2, note: Math.random() * 20 },
      { etudiant_id: 3, matiere_id: 3, note: Math.random() * 20 }
    ]);

    console.log('Peuplement terminé avec succès.');
  } catch (err) {
    console.error('Erreur lors du peuplement de la base de données :', err);
  } finally {
    // Fermer la connexion à la base de données
    await sequelize.close();
  }
})();
