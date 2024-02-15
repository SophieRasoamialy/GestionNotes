import React, { useState } from 'react';
import ListEtudiant from './user/listEtudiant';
import ListMatiere from './user/listMatiere';
import ListNote from './user/listNote';

function Home() {
  const [activeTab, setActiveTab] = useState('etudiant');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="md:flex mx-5">
      <div className="flex  my-auto mx-3 h-full ">
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 h-full my-auto md:mb-0">
        <li>
          <a href="#etudiant" className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'etudiant' ? 'text-white bg-navy-500 ' : 'hover:bg-gray-200'}`} onClick={() => handleTabChange('etudiant')}>
            Étudiant
          </a>
        </li>
        <li>
          <a href="#matiere" className={`inline-flex items-center px-4 py-3 rounded-lg w-full  ${activeTab === 'matiere' ? 'text-white bg-navy-500' : 'hover:bg-gray-200'}`} onClick={() => handleTabChange('matiere')}>
            Matière
          </a>
        </li>
        <li>
          <a href="#note" className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'note' ? 'text-white bg-navy-500' : 'hover:bg-gray-200'}`} onClick={() => handleTabChange('note')}>
            Note
          </a>
        </li>
      </ul>
      </div>
      <div className="content bg-gray-200 text-medium text-gray-500 rounded-lg mx-auto my-5 w-full h-screen">
        {activeTab === 'etudiant' && <ListEtudiant />}
        {activeTab === 'matiere' && <ListMatiere/>}
        {activeTab === 'note' && <ListNote/>}
      </div>
    </div>
  );
}

export default Home;
