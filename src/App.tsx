import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './Navbar';
import { SubjectsTable } from './SubjectsTable';


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
