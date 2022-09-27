import "./App.scss";
import thermometerIcon from "./Thermometer.svg";
import { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState();

  const apikey = process.env.REACT_APP_API_KEY;
  navigator.geolocation.getCurrentPosition((loc) => {
    // console.log(loc.coords.latitude, loc.coords.longitude);
    localStorage.setItem("locationDataLong", loc.coords.longitude);
    localStorage.setItem("locationDataLat", loc.coords.latitude);
  });
  const locationDataLong = localStorage.getItem("locationDataLong");
  const locationDataLat = localStorage.getItem("locationDataLat");
  // console.log(locationDataLong, locationDataLat);

  const getWeatherData = async () => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${locationDataLat},${locationDataLong}`
    );
    const weatherDataJson = await response.json();
    setWeatherData(weatherDataJson);
    // return weatherDataJson;
  };
  getWeatherData();
  // console.log(weatherData);
  // console.log(weatherData?.location);

  return (
    <div className="App">
      {/* <h1>weather: {weatherData?.location.name}</h1> */}
      <div className="widget">
        <h2>Temperature</h2>
        <div className="widget__row">
          <div>
            <h3>{weatherData?.current.temp_c}°C</h3>
            <h3>{weatherData?.current.temp_f}°F</h3>
          </div>
          <img src={thermometerIcon}></img>
        </div>
      </div>
    </div>
  );
}

export default App;
