const main = document.querySelector("main");
const titleLocation = document.querySelector("#title-location");
const currentLocation = document.querySelector("#location");
const current = document.querySelector("#current");
const currentImage = document.querySelector("#current-image");
const currentTempWind = document.querySelector("#current-temp-wind");
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const week = document.querySelector("#week");

currentLocation.textContent = "Stavanger";

async function getWeatherData() {
  try {
    const jsonFetch = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=58.9701&longitude=5.7333&current=temperature_2m,precipitation,rain,snowfall,cloud_cover,wind_speed_10m&hourly=temperature_2m,precipitation,rain,snowfall,cloud_cover,wind_speed_10m&wind_speed_unit=ms&models=metno_seamless"
    );
    const weatherData = await jsonFetch.json();

    console.log(weatherData);
    construct(weatherData);
  } catch (err) {
    console.log(err);
  }
}

getWeatherData();

function construct(data) {
  console.log(data.hourly.rain);
  currentTemp.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;
  currentWind.textContent = `${data.current.wind_speed_10m}${data.current_units.wind_speed_10m}`;
  //   const rain = document.createElement("");
}
