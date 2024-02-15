import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListNote() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); 


  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    console.log("hah");
    try {
      const response = await axios.get('http://localhost:3001/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique pour envoyer les données du formulaire à votre API
  };

  const handleEdit = (matiere) => { 
    /*setSelectedMatiere(matiere);
    setFormDataEdit(matiere);*/
  };

  const handleUpdate = async () => { 
   /* console.log(">> "+formDataEdit.matiere_coef);
    console.log(">> "+formDataEdit.matiere_design);
    try {
      await axios.put(`http://localhost:3001/api/matieres/${selectedMatiere.matiere_id}`, {
        matiere_design:formDataEdit.matiere_design,
        matiere_coef:formDataEdit.matiere_coef
      });
      setFormDataEdit({ matiere_design: '', matiere_coef: '' }); 
      fetchMatiere(); 
      Swal.fire('Succès', 'Matière mis à jour avec succès!', 'success'); // Alert après mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la matière:', error);
      Swal.fire('Erreur', 'Erreur lors de la mise à jour de la matière', 'error'); // Alert en cas d'erreur
    }
    inputRef.current = null;*/

  };

  const handleDelete = async (id) => {
   /* try {
      // Afficher une alerte de confirmation avant la suppression
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cette matière!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:3001/api/matieres/${id}`);
          fetchMatiere(); // Rafraîchir la liste des étudiants après la suppression
          Swal.fire('Succès', 'Matière supprimée avec succès!', 'success'); // Alert après suppression
        }
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de la matière:', error);
      Swal.fire('Erreur', 'Erreur lors de la suppression de la matière', 'error'); // Alert en cas d'erreur
    }*/
  };

  return (
    <div className="relative overflow-x-auto   w-2/3  m-auto">
      <form className="w-full  mx-auto m-5" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-navy-500 py-2">
          <button className="appearance-none bg-transparent border-none w-full text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none" >choisir un etudiant</button> 
          <button className="appearance-none bg-transparent border-none w-full text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none" >choisir une matiere</button> 
          <input className="appearance-none bg-transparent border-none w-full text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Entrer le note"  />

          <button className="flex-shrink-0 bg-navy-500 hover:bg-navy-700 border-navy-500 hover:border-navy-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
           Enregistrer
          </button>
          <button className="flex-shrink-0 border-transparent border-4 text-navy-500 hover:text-navy-700 text-sm py-1 px-2 rounded" type="button">
            Cancel
          </button>
        </div>
      </form>
      <table className="w-full text-sm text-left shadow-md rounded-lg rtl:text-right text-gray-500">
        <thead className="text-xs text-navy-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nom de l'étudiant
            </th>
            <th scope="col" className="px-6 py-3">
              Matiere
            </th>
            <th scope="col" className="px-6 py-3">
              Note
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {note.etudiant.etudiant_nom}
              </td>
              <td className="px-6 py-4">
                {note.matiere.matiere_design}
              </td>
              <td className="px-6 py-4">
                {note.note}
              </td>
              <td className="px-6 py-4 text-right flex ">
                {selectedNote === note ? (
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={handleUpdate}
                  >
                    Mettre à jour
                  </button>
                ) : (
                  <button
                    className="font-medium text-blue-600 hover:underline mr-4"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="font-medium text-red-600 hover:underline"
                  onClick={() => handleDelete(note.etudiant_id,note.matiere_id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListNote;
