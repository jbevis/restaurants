import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import FilterControls from './components/FilterControls';
import { sortAlphabetically, calcTotalPages, addGenres } from "./utils";
import './styles/App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [itemsToDisplay, setItemsToDisplay] = useState();
  const [pageNumbers, setPageNumbers] = useState();
  const [activeGenres, setActiveGenres] = useState([]);
  const [filters, setFilters] = useState({state: null, genre: null});
  const [search, setSearch] = useState("");
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

  const filterRestaurants = () => {
    return restaurants.reduce((acc, restaurant) => {
      const genres = restaurant.split(",");

      if (filters.state) {
        if(restaurant.state === filters.state) {
          acc.push(restaurant)
        }
      }

      if (filters.genre) {
        genres.forEach((genre) => {
          if (genre === restaurant.genre) {
            acc.push(restaurant)
          }
        });
        
        return acc;
      }
    }, [])
  };

  const handleSetFilter = (event) => {
    const filter = {[event.target.id]: event.target.value};

    setFilters(Object.assign(filters, filter));
  };
  
  const handleStateFilter = (event) => {
    const stateFilter = {state: event.target.value};

    setFilters(Object.assign(filters, stateFilter));
  };

  useEffect(() => {
    fetchRestaurants()
    .then((data) => {
      const sorted = sortAlphabetically(data, 'name', true);

      setRestaurants(sorted);
      setActiveGenres(addGenres(sorted).sort((a,b) => a - b));
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

  useEffect(() => {
    const filtered = filterRestaurants();

    setItemsToDisplay(filtered)
  }, [filters]);

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
        ? <section>
            <section className="controls">
              <Pagination 
                totalPages={pageNumbers} 
                handleOnClick={handlePageClick} 
                currentPage={currentPage}
              />
              <FilterControls 
                genres={activeGenres}
                handleSetSearch={(event) => console.log(event.target.value)}
                handleSearch={() => console.log('searching')}
                handleSetFilter={handleSetFilter}
              />
            </section>
            <Table restaurants={itemsToDisplay} />
          </section>
        : <h4>Loading...</h4>
       }
      </section>
    </div>
  );
}

export default App;
