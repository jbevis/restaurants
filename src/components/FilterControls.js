import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stateCodes } from '../utils';

const FilterControls = ({ genres, handleSetSearch, handleSearch, handleSetFilter }) => {
  return (
    <section className="user-input">
      <section className="search">
        <input
          type="text" 
          onChange={(event) => handleSetSearch(event)} 
        />
        <button onClick={handleSearch}>Search</button>
      </section>
      <section className="filters">
        <div className="filter">
          <label htmlFor='state-filter'>Filter by State</label>
          <select id="state" onChange={(event) => handleSetFilter(event)}>
            <option value={null} default></option>
            {stateCodes.map((sc) => 
              <option key={sc} value={sc}>{sc}</option>
            )}
          </select>
        </div>
        <div id="test" className="filter">
          <label htmlFor='genre-filter'>Filter by Genre</label>
          <select id="genre" onChange={(event) => handleSetFilter(event)}>
            <option  value={null} default></option>
            {genres.map((g) => 
              <option  key={g} value={g}>{g}</option>
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