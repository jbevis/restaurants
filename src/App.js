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
      const {state, genre} = filters;

      if (state && genre) {
        if (restaurant.genre.includes(genre) && restaurant.state === state) {
          acc.push(restaurant)
        }
      } else {
        if (genre) {
          if (restaurant.genre.includes(genre)) {
            acc.push(restaurant)
          }
        }
  
        if (state) {
         if (restaurant.state === state) {
           acc.push(restaurant);
         }
        }
      }
      
      return acc;
    }, []);
  };

  const handleSetFilter = (event) => {
    const updated = {[event.target.id]: event.target.value || null};
    
    setFilters(Object.assign(filters, updated));

    if (!filters.state && !filters.genre) {
      if (search) {
        handleSearch();
      } else {
        const sorted = sortAlphabetically(restaurants, 'name', true);
  
        setItemsToDisplay(sorted.slice(indexOfFirstItem, indexOfLastItem));
      }
    } else {
      const filtered = filterRestaurants();
      setItemsToDisplay(filtered);
    }
  };

  const handleSearch = () => {
    const results = restaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(search) ||
             restaurant.city.toLowerCase().includes(search) ||
             restaurant.genre.toLowerCase().includes(search)
    });

    setItemsToDisplay(results);
  };

  const handleSetSearch = (event) => {
    setSearch(event.target.value);

    if (event.target.value === "") {
      const sorted = sortAlphabetically(restaurants, 'name', true);

      setItemsToDisplay(sorted.slice(indexOfFirstItem, indexOfLastItem));
    };
  }

  useEffect(() => {
    fetchRestaurants()
    .then((data) => {
      const sorted = sortAlphabetically(data, 'name', true);

      setPageNumbers(calcTotalPages(sorted, itemsPerPage));
      setRestaurants(sorted);
      setActiveGenres(addGenres(sorted).sort((a,b) => a - b));
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
        Where should we eat?
      </header>
      <section className="main">
       {restaurants?.length
        ? <section>
            <section className="controls">
              <Pagination 
                totalPages={pageNumbers} 
                handleOnClick={handlePageClick} 
                currentPage={currentPage}
              />
              <FilterControls 
                genres={activeGenres}
                handleSetSearch={handleSetSearch}
                handleSearch={handleSearch}
                handleSetFilter={handleSetFilter}
              />
            </section>
            {(restaurants.length && !itemsToDisplay.length)
              ? <h4>Sorry, no results were found.</h4>
              : <Table restaurants={itemsToDisplay} />
            }
          </section>
        : <h4>Loading...</h4>
       }
      </section>
    </div>
  );
}

export default App;
