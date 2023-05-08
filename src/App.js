import hotBg from "./assests/hotBackground.jpg";
import coldBg from "./assests/coldBackground.jpg";
import Description from "./components/Descripton";
import { getFormattedData } from "./WeatherData";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Anjangaon");
  const [bg, setBg] = useState();

  //fetching foratted data from other components
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedData(city);
      setWeather(data);
      setBg(data.temp < 20 ? coldBg : hotBg);
    };
    fetchWeatherData();
  }, [city]);

  //function to get value from input feild when "enter" key is pressed
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.target.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City name"
              />
            </div>
            <div className="section weather">
              <div className="icon">
                <h2>{`${weather.name}, ${weather.country}`}</h2>
                <img src={weather.iconURL} alt={weather.description} />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{weather.temp}°C</h1>
              </div>
            </div>
            <Description weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
