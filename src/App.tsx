import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { SubjectsTable } from './components/SubjectsTable';


function App() {
  return (
    <div>
      <Navbar/>
      <div className="container">
        <SubjectsTable/>
      </div>
    </div>
  );
}

export default App;
