// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Admin from "./admin/admin";
import Etudiant from "./user/listEtudiant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/etd" element={<Etudiant />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
