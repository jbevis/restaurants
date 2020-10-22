import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stateCodes } from '../utils';

const FilterControls = ({ genres, handleSetSearch, handleSearch, handleSetFilter }) => {
  console.log(genres)
  return (
    <section className="user-input">
      <section className="search">
        <input type="text" onChange={(event) => handleSetSearch(event)} />
        <button onClick={handleSearch}>Search</button>
      </section>
      <section className="filters">
        <div className="filter">
          <label for='state-filter'>Filter by State</label>
          <select onChange={handleSetFilter}>
            <option id="state" value={null} default>--</option>
            {stateCodes.map((sc) => 
              <option id="state" key={sc} value={sc}>{sc}</option>
            )}
          </select>
        </div>
        <div className="filter">
          <label for='genre-filter'>Filter by Genre</label>
          <select onChange={handleSetFilter}>
          <option id="genre" value={null} default>--</option>
            {genres.map((g) => 
              <option id="genre" key={g} value={g}>{g}</option>
            )}
          </select>
        </div>
      </section>
    </section>
  )
}

FilterControls.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
  handleSetSearch: PropTypes.func,
  handleSearch: PropTypes.func,
  handleSetFilter: PropTypes.func
}

export default FilterControls;