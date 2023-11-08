import React, { useState, ChangeEvent } from 'react';
import { CourseSearch } from '../data/models';
import { fetchSearch } from '../data/dataFetch';
import { CourseSearchTable } from './CourseSearchTable';
import { size } from 'lodash';
import logo from '../logo.png'

export interface NavbarProps
{
  setIsSearching: (isSearching: boolean) => void;
}

export function Navbar( props: NavbarProps ) {
  const [searchData, setSearchData] = useState<CourseSearch | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    props.setIsSearching(size(text) > 0)
    setSearchData(await fetchSearch(text));
  };

  return (
    <>
      <nav className="navbar" style={{'backgroundColor': '#A60F2D'}}>
        <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img 
            src={logo} 
            alt="Logo" width="24" height="24" 
            className="d-inline-block align-content-middle"
           />
           &nbsp;&nbsp;Cougar Courses
        </a>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={handleInputChange} />
          </form>
        </div>
      </nav>


      <CourseSearchTable data={searchData?.courses || []} />
    </>
  );
}
