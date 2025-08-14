import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { weather_api_url } from './api';
import { weather_api_key } from './api';
import {useState} from 'react';
import Forecast from './components/forecast/forescast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) =>{
    const [lat, lon ] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`);
    const forcastFetch = fetch(`${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`);
    
    Promise.all([currentWeatherFetch, forcastFetch])
    .then(async(response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label , ...weatherResponse});
      setforecast({ city: searchData.label , forecastResponse});
    })
    .catch((err) => console.log(err));
  } 
  console.log(currentWeather);
  console.log(forecast);
  

  return (
    <>
    <div className="container">
      <h1 className="heading"> WEATHER FORECAST</h1>
      <Search onSearchChange = {handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
    </div>
    
    <div className="cards">
    {forecast && <Forecast data={forecast} />}
    </div>
    </>
  );
}

export default App;
