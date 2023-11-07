import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { map, join, round } from 'lodash';


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

function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Coug Courses</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

function SubjectsTable() {
  const [data, setData] = useState<Subjects | null>(null);

  useEffect(() => {
    async function fetchData() {
      const subjects = await fetchSubjects();
      console.log(subjects)
      setData(subjects);
    }

    fetchData();
  }, []);

  const rows = map(data?.items, (item) => <SubjectRow subject={item}/>);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Subject</th>
          <th scope="col"># of Courses Offered</th>
          <th scope="col">Course Drop Rate</th>
          <th scope="col">Campuses</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

function SubjectRow( props: { subject: Subject } )
{
  const { subject } = props;

  const dropRate = (subject.total_dropped || 0) / (subject.total_headcount || 1);
  const roundedDropRate = round(dropRate * 100, 2);

  return (
    <tr>
      <td>{subject.subject}</td>
      <td>{subject.courses_offered}</td>
      <td>{roundedDropRate}%</td>
      <td>{join(subject.campuses, ", ")}</td>
    </tr>
  )
}

async function fetchSubjects(): Promise<Subjects | null> {
  try {
    const response = await fetch('http://127.0.0.1:8000/subject');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

interface Subject {
  subject?: string;
  total_headcount?: number;
  total_dropped?: number;
  courses_offered?: number;
  campuses?: string[];
}

interface Subjects {
  items: Subject[];
}


export default App;
