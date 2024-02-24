import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState('');

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/');
  }, []);

  const fetchPlanets = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPlanets(prevPlanets => [...prevPlanets, ...data.results]);
        setNextPageUrl(data.next);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Map planet names to image URLs
  const planetImages = {
    Tatooine: 'https://th.bing.com/th/id/OIP.0gPmMKfBbfr66rKcSOw0oAHaGy?rs=1&pid=ImgDetMain',
    Alderaan: 'https://th.bing.com/th/id/OIP.m7bEqfLAclKmP8cX2h-jJQHaHa?rs=1&pid=ImgDetMain',
    'Yavin IV': 'https://th.bing.com/th/id/OIP.al62TrPaqhbdDc-5dNACvwHaE2?w=640&h=419&rs=1&pid=ImgDetMain',
    'Hoth': 'https://th.bing.com/th/id/OIP.dWST2ZAPgBsuZi9ip27FvgHaHa?w=720&h=720&rs=1&pid=ImgDetMain',
    'Dagobah': 'https://th.bing.com/th/id/OIP.KHhEN1Q7i6TvDXNvhqLTzgHaG1?rs=1&pid=ImgDetMain',
    'Bespin': 'https://th.bing.com/th/id/OIP.ZpN0G6y-edD0Yu7CREkd4gAAAA?rs=1&pid=ImgDetMain',
    'Endor': 'https://th.bing.com/th/id/OIP.puBJg9-rCKUG2QSWCmZ4QQAAAA?w=325&h=342&rs=1&pid=ImgDetMain',
    'Naboo': 'https://th.bing.com/th/id/OIP.E90k5PK5pRPbViCTeLH-mQAAAA?pid=ImgDet&w=206&h=148&c=7&dpr=1.3',
    'Coruscant': 'https://th.bing.com/th/id/OIP.5phErAszLa7zZy51Sj7oswAAAA?pid=ImgDet&w=206&h=266&c=7&dpr=1.3',
    'Kamino': 'https://th.bing.com/th/id/OIP.khH87yfJ20ofJc-zCpmJrQHaFL?pid=ImgDet&w=206&h=143&c=7&dpr=1.3'
    // Add more planet-image mappings as needed
  };

  const loadMorePlanets = () => {
    if (nextPageUrl) {
      fetchPlanets(nextPageUrl);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Star Wars Planets</h1>
      <div className="planets-container">
        {planets.map(planet => (
          <div key={planet.name} className="planet-card">
            <h2 className="planet-name">{planet.name}</h2>
            <img src={planetImages[planet.name]} alt={planet.name} className="planet-image" style={{ width: '200px', height: '200px' }} />
            <div className="planet-details">
              <p><span className="label">Rotation Period:</span> {planet.rotation_period}</p>
              <p><span className="label">Orbital Period:</span> {planet.orbital_period}</p>
              <p><span className="label">Diameter:</span> {planet.diameter}</p>
              <p><span className="label">Climate:</span> {planet.climate}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="load-more-container">
        {nextPageUrl && (
          <button onClick={loadMorePlanets} className="load-more-btn">Load More</button>
        )}
      </div>
    </div>
  );
}

export default App;
