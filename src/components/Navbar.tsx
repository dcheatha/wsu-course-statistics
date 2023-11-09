import React, { useState, ChangeEvent, useRef } from "react";
import { CourseSearch } from "../data/models";
import { fetchSearch } from "../data/dataFetch";
import { CourseSearchTable } from "./CourseSearchTable";
import { size } from "lodash";
import logo from "../logo.png";
import { SearchModal } from "./SearchModal";

export function Navbar(props: {}) {
  const [searchData, setSearchData] = useState<CourseSearch | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    setSearchData(await fetchSearch(text));
  };

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "#A60F2D" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt="Logo"
              width="24"
              height="24"
              className="d-inline-block align-content-middle"
            />
            &nbsp;&nbsp;Cougar Courses
          </a>
          <form className="d-flex" role="search">
            <input
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
              className="form-control me-2"
              placeholder="Search"
              value={searchText}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </nav>

      <SearchModal>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchText}
          onChange={handleInputChange}
        />
        <CourseSearchTable data={searchData?.courses || []} />
      </SearchModal>
    </>
  );
}
