import "./App.css";

function App() {
  const apikey = process.env.REACT_APP_API_KEY;
  navigator.geolocation.getCurrentPosition((loc) => {
    // console.log(loc.coords.latitude, loc.coords.longitude);
    localStorage.setItem("locationDataLong", loc.coords.longitude);
    localStorage.setItem("locationDataLat", loc.coords.latitude);
  });
  const locationDataLong = localStorage.getItem("locationDataLong");
  const locationDataLat = localStorage.getItem("locationDataLat");
  console.log(locationDataLong, locationDataLat);

  const getWeatherData = async () => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${locationDataLat},${locationDataLong}`
    );
    let weatherDataJson = await response.json();
    console.log(weatherDataJson);
  };
  getWeatherData();

  return (
    <div className="App">
      <h1>TEST</h1>
    </div>
  );
}

export default App;
