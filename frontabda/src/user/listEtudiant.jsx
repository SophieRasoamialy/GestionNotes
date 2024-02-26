import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function ListEtudiant() {
  const [etudiants, setEtudiants] = useState([]);
  const [formData, setFormData] = useState({ etudiant_nom: '', etudiant_moyenne: 0 });
  const [formEtudiantNom, setFormEtudiantNom] = useState(""); 
  const [selectedEtudiant, setSelectedEtudiant] = useState(null); 
  const inputRef = useRef(null); // Déclarez la référence


  useEffect(() => {
    fetchEtudiants();
  }, []);

  useEffect(() => {
    if (selectedEtudiant) {
      inputRef.current.focus(); 
    }
  }, [selectedEtudiant]);
  

  const fetchEtudiants = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/etudiants');
      setEtudiants(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/etudiants', formData);
      setFormData({ etudiant_nom: '', etudiant_moyenne: 0 }); 
      fetchEtudiants(); 
      Swal.fire('Succès', 'Étudiant ajouté avec succès!', 'success'); // Alert après ajout

    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
      Swal.fire('Erreur', 'Erreur lors de l\'ajout de l\'étudiant', 'error'); // Alert en cas d'erreur

    }
  };

  const handleCancel = () => {
    setFormData({ etudiant_nom: '', etudiant_moyenne: 0 }); 
  }

  const handleEdit = (etudiant) => { 
    setSelectedEtudiant(etudiant);
    setFormEtudiantNom(etudiant.etudiant_nom);
  };

  const handleUpdate = async () => { 
    try {
      await axios.put(`http://localhost:3001/api/etudiants/${selectedEtudiant.etudiant_id}`, {etudiant_nom:formEtudiantNom});
      setFormEtudiantNom(""); 
      fetchEtudiants(); 
      Swal.fire('Succès', 'Étudiant mis à jour avec succès!', 'success'); // Alert après mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'étudiant:', error);
      Swal.fire('Erreur', 'Erreur lors de la mise à jour de l\'étudiant', 'error'); // Alert en cas d'erreur
    }
    inputRef.current = null;

  };

  const handleDelete = async (id) => {
    try {
      // Afficher une alerte de confirmation avant la suppression
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cet étudiant!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:3001/api/etudiants/${id}`);
          fetchEtudiants(); // Rafraîchir la liste des étudiants après la suppression
          Swal.fire('Succès', 'Étudiant supprimé avec succès!', 'success'); // Alert après suppression
        }
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant:', error);
      Swal.fire('Erreur', 'Erreur lors de la suppression de l\'étudiant', 'error'); // Alert en cas d'erreur
    }
  };
  

  return (
    <div className="relative overflow-x-auto w-2/3 m-auto">
      <h3 className="text-navy-500 text-bold text-center my-3 ">LISTE DES ETUDIANTS</h3>
      <form className="w-2/3  mx-auto m-5 " onSubmit={handleSubmit}>
        <div className="flex w-full  items-center border-b border-navy-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-2/3 text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Nom de l'étudiant"
            aria-label="Nom de l'étudiant"
            value={formData.etudiant_nom}
            onChange={(e) => setFormData({ ...formData, etudiant_nom: e.target.value })}
            required
          />
          <input
            className="appearance-none bg-transparent border-none w-1/3 text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="number"
            step="0.01"
            placeholder="Moyenne"
            aria-label="Moyenne"
            value={formData.etudiant_moyenne}
            onChange={(e) => setFormData({ ...formData, etudiant_moyenne: e.target.value })}
            required
          />
          <button
            className="flex-shrink-0 bg-navy-500 hover:bg-navy-700 border-navy-500 hover:border-navy-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Enregistrer
          </button>
          <button onClick={handleCancel} type="button" className="flex-shrink-0 border-transparent border-4 text-navy-500 hover:text-navy-700 text-sm py-1 px-2 rounded" >
            Cancel
          </button>
        </div>
      </form>
      <table className="w-full text-sm text-left shadow-md rounded-lg rtl:text-right text-gray-500">
        <thead className="text-xs text-navy-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Numero de l'étudiant
            </th>
            <th scope="col" className="px-6 py-3">
              Nom de l'étudiant
            </th>
            <th scope="col" className="px-6 py-3">
              Moyenne
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((etudiant) => (
            <tr key={etudiant.etudiant_id} className="bg-white border-b  hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                {etudiant.etudiant_id}
              </td>
              <td className="px-6 py-4 text-gray-700">
                {selectedEtudiant === etudiant ? (
                  
                  <input
                  ref={inputRef}
                    type="text"
                    className='appearance-none border-b border-navy-500  bg-transparent focus text-navy-500 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    value={formEtudiantNom}
                    onChange={(e) => setFormEtudiantNom(e.target.value )}
                    required
                  />
                ) : (
                  etudiant.etudiant_nom
                )}
              </td>
              <td className="px-6 py-4 text-gray-700">
                {etudiant.etudiant_moyenne}
              </td>
              <td className="px-6 py-4 text-right flex ">
                {selectedEtudiant === etudiant ? (
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={handleUpdate}
                  >
                    Mettre à jour
                  </button>
                ) : (
                  <button
                    className="font-medium text-blue-600 hover:underline mr-4"
                    onClick={() => handleEdit(etudiant)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="font-medium text-red-600 hover:underline"
                  onClick={() => handleDelete(etudiant.etudiant_id)}
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
