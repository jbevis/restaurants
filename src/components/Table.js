import React from 'react';
import TableRow from './TableRow';
import PropTypes from 'prop-types';

const Table = ({ restaurants }) => {
  return (
    <table className="table">
      <tr className="table-header">
        <th>Restaurant</th>
        <th>City</th>
        <th>State</th>
        <th>Phone</th>
        <th>Genres</th>
      </tr>
      {restaurants.map((restaurant) => {
        return (
          <TableRow datum={restaurant} />
        )
      })}
    </table>
  );
}

Table.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Table;