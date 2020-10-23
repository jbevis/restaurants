import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ totalPages, handleOnClick, currentPage }) => {
  return (
    <section className="pagination-nav">
      <p>page:</p>
      <ul className="pagination-nav">
        {totalPages.map((number) => {
          return (
            <li 
              className={(currentPage === number ? 'active page-nav' : 'page-nav')}
              key={number} 
              id={number} 
              onClick={handleOnClick}
            >
              {number}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.arrayOf(PropTypes.number),
  handleOnClick: PropTypes.func,
  currentPage: PropTypes.string
};

export default Pagination;