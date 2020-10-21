import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ restaurants }) => {
  return (
    <table>
      <th>
        <td>Restaurant</td>
        <td>City</td>
        <td>State</td>
        <td>Phone</td>
        <td>Genres</td>
      </th>
      {restaurants.map((restaurant) => {
        console.log(restaurant)
        const { id, name, state, city, telephone, genre } = restaurant;

        return (
          <tr key={id}>
            <td>{name}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{telephone}</td>
            <td>
              {genre.split(',').join(" ")}
            </td>
          </tr>
        )
      })}
    </table>
  );
}

Table.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Table;