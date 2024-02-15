import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function ListEtudiant() {
  const [matieres, setMatieres] = useState([]);
  const [formData, setFormData] = useState({ matiere_design: '', matiere_coef: '' });
  const [formDataEdit, setFormDataEdit] = useState({ matiere_design: '', matiere_coef: '' });
  const [selectedMatiere, setSelectedMatiere] = useState(null); 
  const inputRef = useRef(null); // Déclarez la référence


  useEffect(() => {
    fetchMatiere();
  }, []);

  useEffect(() => {
    if (selectedMatiere) {
      inputRef.current.focus(); 
    }
  }, [selectedMatiere]);
  

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
      await axios.post('http://localhost:3001/api/matieres', formData);
      setFormData({ matiere_design: '', matiere_coef: '' }); 
      fetchMatiere(); 
      Swal.fire('Succès', 'Matière ajoutée avec succès!', 'success'); // Alert après ajout

    } catch (error) {
      console.error('Erreur lors de l\'ajout de la matière:', error);
      Swal.fire('Erreur', 'Erreur lors de l\'ajout de la matière', 'error'); // Alert en cas d'erreur

    }
  };

  const handleEdit = (matiere) => { 
    setSelectedMatiere(matiere);
    setFormDataEdit(matiere);
  };

  const handleUpdate = async () => { 
    console.log(">> "+formDataEdit.matiere_coef);
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
    inputRef.current = null;

  };

  const handleDelete = async (id) => {
    try {
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
    }
  };
  
  return (
    <div className="relative overflow-x-auto w-2/3 m-auto">
      <form className="w-full max-w-sm mx-auto m-5" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-navy-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-2/3 text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Nom de la matière"
            aria-label="Nom de la matière"
            value={formData.matiere_design}
            onChange={(e) => setFormData({ ...formData, matiere_design: e.target.value })}
            required
          />
          <input
            className="appearance-none bg-transparent border-none w-1/3 text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="number"
            step="0.01"
            placeholder="coeff"
            aria-label="Coeff"
            value={formData.matiere_coef}
            onChange={(e) => setFormData({ ...formData, matiere_coef: e.target.value })}
            required
          />
          <button
            className="flex-shrink-0 bg-navy-500 hover:bg-navy-700 border-navy-500 hover:border-navy-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Enregistrer
          </button>
        </div>
      </form>
      <table className="w-full text-sm text-left shadow-md rounded-lg rtl:text-right text-gray-500">
        <thead className="text-xs text-navy-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Matiere
            </th>
            <th scope="col" className="px-6 py-3">
              Coefficient
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {matieres.map((matiere) => (
            <tr key={matiere.matiere_id} className="bg-white border-b  hover:bg-gray-50">
              
              <td className="px-6 py-4 text-gray-700">
                {selectedMatiere === matiere ? (
                  
                  <input
                  ref={inputRef}
                    type="text"
                    className='appearance-none border-b border-navy-500  bg-transparent focus text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    value={formDataEdit.matiere_design}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, matiere_design: e.target.value })}
                    required
                  />
                ) : (
                  matiere.matiere_design
                )}
              </td>
              <td className="px-6 py-4 text-gray-700">
              {selectedMatiere === matiere ? (
                  <input
                    type="float"
                    className='appearance-none border-b border-navy-500  bg-transparent focus text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    value={formDataEdit.matiere_coef}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, matiere_coef: e.target.value })}
                    required
                  />
                ) : (
                  matiere.matiere_coef
                )}
              </td>
              <td className="px-6 py-4 text-right flex ">
                {selectedMatiere === matiere ? (
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={handleUpdate}
                  >
                    Mettre à jour
                  </button>
                ) : (
                  <button
                    className="font-medium text-blue-600 hover:underline mr-4"
                    onClick={() => handleEdit(matiere)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="font-medium text-red-600 hover:underline"
                  onClick={() => handleDelete(matiere.matiere_id)}
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

export default ListEtudiant;
