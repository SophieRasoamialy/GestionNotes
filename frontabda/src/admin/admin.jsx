import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [auditNotes, setAuditNotes] = useState([]);
  const [stats, setStats] = useState({
    insertionCount: 0,
    updateCount: 0,
    deletionCount: 0
  });

  useEffect(() => {
    fetchAuditNotes(); // Appel initial
    const intervalId = setInterval(fetchAuditNotes, 1000); // Actualisation chaque seconde
    return () => clearInterval(intervalId); // Nettoyage de l'intervalle lors du démontage du composant
  }, []);

  const fetchAuditNotes = async () => {
    try {
      const [notesResponse, statsResponse] = await Promise.all([
        axios.get('http://localhost:3001/api/audit_notes'),
        axios.get('http://localhost:3001/api/audit_stats')
      ]);
      setAuditNotes(notesResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <div className='w-full flex'>
      <div className="relative overflow-x-auto w-4/5 p-5">
        <h3 className="text-navy-500 text-bold text-center my-2 ">LISTE DES OPERATIONS</h3>
        {/* Tableau des données */}
      </div>
      <div  className="w-1/5 my-14 text-sm text-left shadow-lg h-fit rounded-lg rtl:text-right text-navy-500">
        <p className="px-6 py-4 font-medium text-navy-700 ">Nombre d'insertions: {stats.insertionCount}</p>
        <p className="px-6 py-4 font-medium text-navy-700 ">Nombre de mises à jour: {stats.updateCount}</p>
        <p className="px-6 py-4 font-medium text-navy-700 ">Nombre de suppressions: {stats.deletionCount}</p>
      </div>
    </div>
  );
}

export default Admin;
