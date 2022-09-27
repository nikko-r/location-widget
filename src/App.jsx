import "./App.css";

function App() {
  const apikey = process.env.REACT_APP_API_KEY;
  console.log(apikey);
  const getWeatherData = async () => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=51.4249,-0.1032`
    );
    let weatherDataJson = await response.json();
    console.log(weatherDataJson);
  };
  getWeatherData();
  navigator.geolocation.getCurrentPosition((loc) => {
    console.log(loc.coords.latitude, loc.coords.longitude);
  });
  return (
    <div className="App">
      <h1>TEST</h1>
    </div>
  );
}

export default App;
