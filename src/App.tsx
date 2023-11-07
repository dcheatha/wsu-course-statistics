import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect, ChangeEvent } from 'react';
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
  const [searchData, setSearchData] = useState<CourseSearch | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    let searchResults = await fetchSearch(e.target.value);
    setSearchData(searchResults);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Coug Courses</a>
          <form className="d-flex" role="search">
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search" 
              value={searchText}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </nav>

      Search Results (n = {searchData?.courses.length || 0})

      <CourseSearchTable data={searchData?.courses || []}/>
    </>
  )
}

async function fetchSearch(text: String): Promise<CourseSearch | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/search?search=${text}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

interface CourseSearchItem {
  subject: string;
  catalog_no: number;
  title?: string | null;
  total_headcount?: number | null;
}

interface CourseSearch {
  courses: CourseSearchItem[];
}


function CourseSearchRow(props: { item: CourseSearchItem }) {
  return (
    <tr>
      <td>{props.item.subject}</td>
      <td>{props.item.catalog_no}</td>
      <td>{props.item.title || 'N/A'}</td>
      <td>{props.item.total_headcount || 'N/A'}</td>
    </tr>
  );
}

function CourseSearchTable(props: { data: CourseSearchItem[] }) {
  let rows = map(props.data, (item, index) => (
    <CourseSearchRow key={index} item={item} />
  ));

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Catalog Number</th>
          <th>Title</th>
          <th>Total Headcount</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
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
