import "./App.scss";
import thermometerIcon from "./Thermometer.svg";
import compassIcon from "./Compass.svg";
import windIcon from "./Wind.svg";
import windDirectionIcon from "./WindDirection.svg";
import { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState();

  const currentHour = new Date().getHours();
  let greetingTime = "Morning!";
  if (currentHour >= 12) {
    greetingTime = "Afternoon!";
  }
  if (currentHour >= 18) {
    greetingTime = "Evening!";
  }

  navigator.geolocation.getCurrentPosition((loc) => {
    // console.log(loc.coords.latitude, loc.coords.longitude);
    localStorage.setItem("locationDataLong", loc.coords.longitude);
    localStorage.setItem("locationDataLat", loc.coords.latitude);
  });
  const locationDataLong = localStorage.getItem("locationDataLong");
  const locationDataLat = localStorage.getItem("locationDataLat");
  // console.log(locationDataLong, locationDataLat);

  const apikey = process.env.REACT_APP_API_KEY;
  const getWeatherData = async () => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${locationDataLat},${locationDataLong}`
    );
    const weatherDataJson = await response.json();
    setWeatherData(weatherDataJson);
    console.log(weatherDataJson);
    // return weatherDataJson;
  };
  // console.log(weatherData);
  // console.log(weatherData?.location);

  const welcomeTts = () => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = `Good ${greetingTime}. The temperature is ${weatherData?.current.temp_c}°C. The weather is ${weatherData?.current.condition.text}, with wind speeds of ${weatherData?.current.wind_mph} mph`;
    window.speechSynthesis.speak(msg);
    console.log("tts");
  };
  useEffect(() => {
    getWeatherData();

    window.onload = function () {
      console.log("refresh");
      setTimeout(welcomeTts(), 3000);
    };
  }, []);

  return (
    <div className="App">
      {/* <h1>weather: {weatherData?.location.name}</h1> */}
      <div id="greeting-widget" className="widget widget--super-wide">
        <h3>Good {greetingTime}</h3>
      </div>
      <div id="location-widget" className="widget widget--wide widget__row">
        <div>
          <h2>Location</h2>
          <h3>{weatherData?.location.country}</h3>
          <h1>{weatherData?.location.region}</h1>
          <h1>{weatherData?.location.name}</h1>
        </div>
        <img src={compassIcon} alt="compass icon"></img>
      </div>
      <div id="temperature-widget" className="widget">
        <h2>Temperature</h2>
        <div className="widget__row">
          <div>
            <h3>{weatherData?.current.temp_c}°C</h3>
            <h3>{weatherData?.current.temp_f}°F</h3>
          </div>
          <img src={thermometerIcon} alt="thermometer icon"></img>
        </div>
      </div>
      <div id="weather-widget" className="widget">
        <h2>Weather</h2>
        <h3>{weatherData?.current.condition.text}</h3>
      </div>
      <div id="windspeed-widget" className="widget">
        <h2>Wind Speed</h2>
        <h3>{weatherData?.current.wind_mph} mph</h3>
        <h3>{weatherData?.current.wind_kph} kph</h3>
        <img src={windIcon} alt="wind icon"></img>
      </div>
      <div id="winddirection-widget" className="widget">
        <h2>Wind Direction</h2>
        <h3>{weatherData?.current.wind_dir}</h3>
        <img src={windDirectionIcon} alt="wind direction icon"></img>
      </div>
    </div>
  );
}

export default App;
