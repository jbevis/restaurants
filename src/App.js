import React, { useState, useEffect } from 'react';
import Table from './components/Table'
import './styles/App.css';

function App() {

  const [restaurants, setRestaurants] = useState([]);

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
    .then((data) => setRestaurants(data))
    .catch((error) => {
      console.log('There was an error fetching the data.', error);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Where the fuck should we eat?
      </header>
      <section>
       {restaurants.length
        ? <Table restaurants={restaurants} />
        : <h4>Loading...</h4>
       }
      </section>
    </div>
  );
}

export default App;
