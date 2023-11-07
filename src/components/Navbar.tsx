import React, { useState, ChangeEvent } from 'react';
import { CourseSearch } from '../data/models';
import { fetchSearch } from '../data/dataFetch';
import { CourseSearchTable } from './CourseSearchTable';
import { size } from 'lodash';

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


      <CourseSearchTable data={searchData?.courses || []} />
    </>
  );
}
