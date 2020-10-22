import React from 'react';
import TableRow from './TableRow';
import PropTypes from 'prop-types';

const Table = ({ restaurants }) => {
  return (
    <table className="table">
      <thead>
        <tr className="table-header">
          <th>Restaurant</th>
          <th>City</th>
          <th>State</th>
          <th>Phone</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant) => {
          return (
            <TableRow key={restaurant.id} datum={restaurant} />
          )
        })}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Table;