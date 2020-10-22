import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ datum }) => {
  const {
    id,
    name,
    city,
    state,
    telephone,
    genre
  } = datum;

  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{telephone}</td>
      <td>
        <ul>
          {genre.split(',').map((item) => <li>{item}</li>)}
        </ul>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  datum: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    telephone: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired
};

export default TableRow;