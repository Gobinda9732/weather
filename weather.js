const searchInput = document.getElementById("user-location");
const searchBtn = document.getElementById("search-btn");
const locationData = document.querySelector(".location-data");
const skyImage = document.querySelector("#sky-image");
const temperature = document.querySelector(".temperature");
const weatherCondition = document.querySelector(".weather-condition");
const feelsLikeData = document.querySelector(".feels-like-data");

const humidity = document.querySelector("#Hvalue");
const windSpeed = document.querySelector("#Wvalue");
// const tempMin = document.querySelector('#SRvalue');
// const tempMax = document.querySelector('#SSvalue');
const clouds = document.querySelector("#Cvalue");
const LAvalue = document.querySelector("#LAvalue");
const LOvalue = document.querySelector("#LOvalue");
const pressure = document.querySelector("#Pvalue");

searchBtn.addEventListener("click", () => {
  showWeather(getData);
});

async function getData(loc) {
  const apiKey = "5c5ab2a0a3a5af43ad7e8810c2ba31f7";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    // alert("City name was incorrect or not found.");
    return;
  }
  return data;
}

async function showWeather(getData) {
  const loc = searchInput.value ? searchInput.value : "kolkata";
  const data = await getData(loc);

  locationData.textContent = `${data.name}, ${data.sys.country}`;
  skyImage.attributes.src.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temperature.innerHTML = `${Math.floor(data.main.temp)}<sup>°</sup>C`;
  feelsLikeData.innerHTML = `Feels like ${Math.floor(
    data.main.feels_like
  )}<sup>°</sup>C`;
  weatherCondition.innerHTML = data.weather[0].description;

  humidity.textContent = `${data.main.humidity}`;
  windSpeed.textContent = `${Math.floor(data.wind.speed)}`;

  // tempMin.innerHTML = `${data.main.temp_min}<sup>°</sup>C`;
  // tempMax.innerHTML = `${data.main.temp_max}<sup>°</sup>C`;
  clouds.textContent = `${data.clouds.all}`;
  LAvalue.textContent = `${data.coord.lat}`;
  LOvalue.textContent = `${data.coord.lon}`;
  pressure.textContent = `${data.main.pressure}`;
}

showWeather(getData);
