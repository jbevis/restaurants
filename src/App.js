import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import { sortAlphabetically, calcTotalPages } from "./utils";
import './styles/App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [itemsToDisplay, setItemsToDisplay] = useState();
  const [pageNumbers, setPageNumbers] = useState();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const fetchRestaurants = async () => {
    const response = await fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    });
    
    return response.json();
  };

  useEffect(() => {
    fetchRestaurants()
    .then((data) => {
      const sorted = sortAlphabetically(data, 'name');

      setRestaurants(sorted);
      setPageNumbers(calcTotalPages(sorted, itemsPerPage));
      setItemsToDisplay(sorted.slice(indexOfFirstItem, indexOfLastItem));
    })
    .catch((error) => {
      console.log('There was an error fetching the data.', error);
    });
  }, []);

  useEffect(() => {
    setItemsToDisplay(restaurants.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.target.id);
  }

  return (
    <div className="App">
      <header className="App-header">
        Where the fuck should we eat?
      </header>
      <section className="main">
       {itemsToDisplay?.length
        ? <>
            <Pagination 
              totalPages={pageNumbers} 
              handleOnClick={handlePageClick} 
              currentPage={currentPage}
            />
            <Table restaurants={itemsToDisplay} />
          </>
        : <h4>Loading...</h4>
       }
      </section>
    </div>
  );
}

export default App;
