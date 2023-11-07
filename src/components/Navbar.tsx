import React, { useState, ChangeEvent } from 'react';
import { CourseSearch } from '../data/models';
import { fetchSearch } from '../data/dataFetch';
import { CourseSearchTable } from './CourseSearchTable';

export function Navbar() {
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
              onChange={handleInputChange} />
          </form>
        </div>
      </nav>

      Search Results (n = {searchData?.courses.length || 0})

      <CourseSearchTable data={searchData?.courses || []} />
    </>
  );
}
