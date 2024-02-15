import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [auditNotes, setAuditNotes] = useState([]);

  useEffect(() => {
    fetchAuditNotes();
  }, []);

  const fetchAuditNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/audit_notes');
      setAuditNotes(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <div className="relative overflow-x-auto w-4/5 m-auto">
      
      <table className="w-full text-sm text-left shadow-md rounded-lg rtl:text-right text-gray-500">
        <thead className="text-xs text-navy-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Type d'opération
            </th>
            <th scope="col" className="px-6 py-3">
              Date de mise à jour
            </th>
            <th scope="col" className="px-6 py-3">
              Num Etudiant
            </th>
            <th scope="col" className="px-6 py-3">
              Nom Etudiant
            </th>
            <th scope="col" className="px-6 py-3">
              Matiere
            </th>
            <th scope="col" className="px-6 py-3">
              Ancien Note
            </th>
            <th scope="col" className="px-6 py-3">
              Nouveau Note
            </th>
            
          </tr>
        </thead>
        <tbody>
          {auditNotes.map((auditNote) => (
            <tr key={auditNote.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {auditNote.operation_type}
              </td>
              <td className="px-6 py-4">
                {auditNote.date_mise_a_jour}
              </td>
              <td className="px-6 py-4">
                {auditNote.etudiant_id}
              </td>
              <td className="px-6 py-4">
                {auditNote.etudiant_nom}
              </td>
              <td className="px-6 py-4">
                {auditNote.design}
              </td>
              <td className="px-6 py-4">
                {auditNote.note_ancien}
              </td>
              <td className="px-6 py-4">
                {auditNote.note_nouveau}
              </td>
              <td className="px-6 py-4">
                {auditNote.utilisateur}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
