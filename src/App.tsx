import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { AllSubjectsTable } from './components/SubjectsTable';


function App() {
  return (
    <div>
      <Navbar/>
      <div className="container">
        <AllSubjectsTable/>
      </div>
    </div>
  );
}

export default App;
