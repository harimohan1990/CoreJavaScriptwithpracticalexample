 // Debounce function
 function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // API Key (replace with your own OpenWeather API key)
  const API_KEY = '02a5b232d310237219296073c481bde0';

  // Perform the API search
  async function performSearch(query) {
    if (!query) {
      document.getElementById('results').innerHTML = '';
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod === 200) {
        displayResults(data);
      } else {
        document.getElementById('results').innerHTML = 'City not found!';
      }
    } catch (error) {
      document.getElementById('results').innerHTML = 'Error fetching data!';
    }
  }

  // Display results in the UI
  function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;
  }

  // Handle search input
  const searchBox = document.getElementById('search-box');
  const debouncedSearch = debounce((e) => performSearch(e.target.value), 500);

  searchBox.addEventListener('input', debouncedSearch);