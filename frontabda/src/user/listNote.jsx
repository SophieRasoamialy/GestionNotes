import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ListNote() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); 
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [noteEdit, setNoteEdit] = useState("");
  const [noteNew, setNoteNew] = useState(0);
  const [etudiants, setEtudiants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const inputRef = useRef(null);



  useEffect(() => {
    fetchNotes();
    fetchEtudiants();
    fetchMatiere();
  }, []);

  useEffect(() => {
    if (selectedNote) {
      inputRef.current.focus(); 
    }
  }, [selectedNote]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
  const fetchEtudiants = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/etudiants');
      setEtudiants(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const fetchMatiere = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/matieres');
      setMatieres(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/notes', {
        etudiant_id:selectedEtudiant,
        matiere_id:selectedMatiere,
        note:noteNew
      });
      setSelectedEtudiant(null);
      setSelectedMatiere(null);
      setNoteNew(0);
      fetchNotes();
      Swal.fire('Succès', 'Note ajouté avec succès!', 'success'); // Alert après ajout

    } catch (error) {
      console.error('Erreur lors de l\'ajout du note:', error);
      Swal.fire('Erreur', 'Erreur lors de l\'ajout du note', 'error'); // Alert en cas d'erreur

    }
  };

  const handleCancel = () => {
    setSelectedEtudiant(null);
    setSelectedMatiere(null);
    setNoteNew(0);
  }

  const handleEdit = (note) => { 
    setSelectedEtudiant(note.etudiant_id);
    setSelectedMatiere(note.matiere_id);
    setNoteEdit(note.note);
    setSelectedNote(note);

  };


  const handleUpdate = async () => { 
    try {
      await axios.put(`http://localhost:3001/api/notes/${selectedEtudiant}/${selectedMatiere}`, {
        note:noteEdit
      });
      setNoteEdit(""); 
      fetchNotes();
      Swal.fire('Succès', 'Note mis à jour avec succès!', 'success'); // Alert après mise à jour
      setSelectedNote(0);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du note:', error);
      Swal.fire('Erreur', 'Erreur lors de la mise à jour du note', 'error'); // Alert en cas d'erreur
    }
    inputRef.current = null;

  };

  const handleDelete = async (etudiant_id, matiere_id) => {
    try {
      // Afficher une alerte de confirmation avant la suppression
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer ce note!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:3001/api/notes/${etudiant_id}/${matiere_id}`);
          fetchNotes(); // Rafraîchir la liste des étudiants après la suppression
          Swal.fire('Succès', 'Notes supprimé avec succès!', 'success'); // Alert après suppression
        }
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du note:', error);
      Swal.fire('Erreur', 'Erreur lors de la suppression du note', 'error'); // Alert en cas d'erreur
    }
  };

  return (
    <div className="relative overflow-x-auto   w-2/3  m-auto">
    <h3 className="text-navy-500 font-extrabold text-center my-3 ">LISTE DES NOTES</h3>
      <form className="w-full  mx-auto m-5" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-navy-500 py-2">

          <select onChange={(e) => setSelectedEtudiant(e.target.value )} className="appearance-none bg-transparent border-none w-full text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none" >
            <option value={null}>Choisir un etudiant</option>
            {etudiants.map((etudiant) => (
              <option value={etudiant.etudiant_id}>{etudiant.etudiant_nom}</option>
            ))}  
          </select> 

          <select onChange={(e) => setSelectedMatiere(e.target.value )} className="appearance-none bg-transparent border-none w-full text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none" >
            <option value={null}>Choisir une matiere</option>
            {matieres.map((matiere) => (
              <option value={matiere.matiere_id}>{matiere.matiere_design}</option>
            ))}  
          </select>

          <input 
          value={noteNew}
          onChange={(e) => setNoteNew(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none" 
          type="text" placeholder="Entrer la note"  />

          <button className="flex-shrink-0 bg-navy-500 hover:bg-navy-700 border-navy-500 hover:border-navy-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
           Enregistrer
          </button>
          <button onClick={handleCancel} className="flex-shrink-0 border-transparent border-4 text-navy-500 hover:text-navy-700 text-sm py-1 px-2 rounded" type="button">
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
              {selectedNote === note ? (
                  
                  <input
                  ref={inputRef}
                    type="text"
                    className='appearance-none border-b border-navy-500  bg-transparent focus text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    value={noteEdit}
                    onChange={(e) => setNoteEdit(e.target.value )}
                    required
                  />
                ) : (
                  note.note
                )}
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
