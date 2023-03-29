import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

import "./PeopleList.css";

function PeopleList(props) {
  const [toggle, setToggle] = useState(false);
  const [viewList, setViewList] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  const url = searchTerm
    ? `http://localhost:8080/api/v1/people`
    : `http://localhost:8080/api/v1/people?size=${size}&page=${page}`;

  const toggleHelper = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    async function getData() {
      const res = await axios.get(url);
      const data = res.data;
      setViewList(data.content);
      setTotalPages(data.totalPages);
      setFilterOptions(getFilterOptions(data));
    }
    getData();
  }, [url, toggle]);

  function getFilterOptions(data) {
    return data.content.reduce((acc, person) => {
      Object.entries(person.address).forEach(([key, value]) => {
        if (key !== "id" && !acc[key]?.includes(value)) {
          acc[key] = [...(acc[key] || []), value];
        }
      });
      return acc;
    }, {});
  }

  const pageChangeHandler = (newPage) => {
    setPage(newPage);
  };

  const sizeChangeHandler = (e) => {
    setSize(e.target.value);
    setPage(0);
  };

  const searchInputChangeHandler = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const filterInputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredPeopleList = viewList.filter((person) => {
    const searchParams = `${person.personalName.givenNames[0].value} ${person.personalName.surname.value} ${person.address.number} ${person.address.street} ${person.address.city} ${person.address.state} ${person.address.zip}`;
    const searchTermMatch =
      searchTerm.trim() === "" ||
      searchParams.toLowerCase().includes(searchTerm.toLowerCase());

    const filterMatches = Object.entries(selectedFilters).every(
      ([filterName, filterValue]) => {
        return (
          filterValue === "" ||
          person.address[filterName]?.includes(filterValue)
        );
      }
    );

    return searchTermMatch && filterMatches;
  });

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const clearSearchInput = () => {
    setSearchTerm("");
  };

  return (
    <Fragment>
      <div className="searchSortFilter">
        <div>
          Show{" "}
          <select value={size} onChange={sizeChangeHandler}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>{" "}
          People
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={searchInputChangeHandler}
          />
          <button onClick={clearSearchInput}>Clear</button>
        </div>
        {Object.entries(filterOptions).map(([filterName, filterValues]) => (
          <div className="filter" key={filterName}>
            <label htmlFor={filterName}>{filterName}:</label>
            <select
              id={filterName}
              name={filterName}
              defaultValue=""
              value={selectedFilters[filterName] || ""}
              onChange={filterInputChangeHandler}
            >
              <option value="">All</option>
              {filterValues.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {filteredPeopleList.map((person) => (
        <Person
          key={person.id}
          id={person.id}
          firstName={person.personalName.givenNames[0].value}
          lastName={person.personalName.surname.value}
          address={person.address}
          toggleHelper={toggleHelper}
        />
      ))}
      <div className="pagination">
        <button
          disabled={page === 0}
          onClick={() => pageChangeHandler(page - 1)}
        >
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <p
            key={pageNumber}
            onClick={
              pageNumber !== page ? () => pageChangeHandler(pageNumber) : null
            }
          >
            {pageNumber + 1}
          </p>
        ))}
        <button
          disabled={page === totalPages - 1}
          onClick={() => pageChangeHandler(page + 1)}
        >
          Next
        </button>
      </div>
    </Fragment>
  );
}

export default PeopleList;
