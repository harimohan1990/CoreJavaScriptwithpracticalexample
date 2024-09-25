import React, { useState, useCallback } from 'react';

const WeatherSearch = () => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  
  const API_KEY = 'YOUR_API_KEY_HERE'; // OpenWeather API key

  // Debounced search function using useCallback
  const performSearch = async (city) => {
    if (!city) {
      setWeatherData(null);
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError(null);
      } else {
        setError('City not found!');
        setWeatherData(null);
      }
    } catch (err) {
      setError('Error fetching data!');
      setWeatherData(null);
    }
  };

  // Debounced function wrapped with useCallback to prevent unnecessary re-renders
  const debouncedSearch = useCallback(debounce((searchTerm) => performSearch(searchTerm), 500), []);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for city..."
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
