const API_KEY = "{Your API KEY}"; //API key for authentication
const iconUrl = (iconId) => `https:openweathermap.org/img/wn/${iconId}@2x.png`; //making icon url for displaying icon according to description

const getFormattedData = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const data = await fetch(URL) //getting weather data from api
    .then((res) => res.json()) //converting data to json format
    .then((data) => data); //storing received data to "data" variable

  //destructuring the received data
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];
  const tempInCelsius = (temp - 273.15).toFixed(2); //converting Kelvin to Celsius and round to 2 decimal places
  const tempMin = (temp_min - 273.15).toFixed(2);
  const tempMax = (temp_max - 273.15).toFixed(2);
  const feelsLike = (feels_like - 273.15).toFixed(2);

  //returning the destructured object which contains only data required for app
  return {
    name,
    temp: tempInCelsius,
    country,
    description,
    iconURL: iconUrl(icon),
    temp_min: tempMin,
    temp_max: tempMax,
    feels_like: feelsLike,
    humidity,
    pressure,
    speed,
  };
};
export { getFormattedData };
