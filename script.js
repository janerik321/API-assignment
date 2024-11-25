const main = document.querySelector("main");
const titleLocation = document.querySelector("#title-location");
const currentLocation = document.querySelector("#location");
const current = document.querySelector("#current");
const currentImage = document.querySelector("#current-image");
const currentTempWind = document.querySelector("#current-temp-wind");
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const week = document.querySelector("#week");
// const currentTime = new Date();
currentLocation.textContent = "Stavanger";

async function getWeatherData() {
  try {
    const jsonFetch = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=58.9701&longitude=5.7333&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&wind_speed_unit=ms&timezone=auto"
    );
    const weatherData = await jsonFetch.json();

    console.log(weatherData);
    construct(weatherData);
  } catch (err) {
    console.log(err);
  }
}

getWeatherData();

// console.log(currentTime.getHours(), currentTime.getMinutes());

function construct(data) {
  let currentImageName = "";
  // let weatherCodeIndex = 0;
  // if (currentTime.getMinutes() >= 30) {
  //   weatherCodeIndex = currentTime.getHours() + 1;
  // } else {
  //   weatherCodeIndex = currentTime.getHours();
  // }

  function weatherCodes() {
    // console.log(data.hourly.weather_code[currentTime.getHours()]);
    // console.log(data.current.weather_code);

    if (data.current.weather_code === 0) {
      console.log("Clear sky");
      currentImageName = "day";
    } else if (data.current.weather_code === 1) {
      console.log("Mainly clear");
      currentImageName = "cloudy-day-1";
    } else if (data.current.weather_code === 2) {
      console.log("Partly cloudy");
      currentImageName = "cloudy-day-2";
    } else if (data.current.weather_code === 3) {
      console.log("Overcast");
      currentImageName = "cloudy";
    } else if (data.current.weather_code === 45) {
      console.log("Fog");
      currentImageName = "cloudy";
    } else if (data.current.weather_code === 48) {
      console.log("Depositing rime fog");
      currentImageName = "cloudy";
    } else if (data.current.weather_code === 51) {
      console.log("Light drizzle");
      currentImageName = "rainy-4";
    } else if (data.current.weather_code === 53) {
      console.log("Moderate drizzle");
      currentImageName = "rainy-5";
    } else if (data.current.weather_code === 55) {
      console.log("Dense drizzle");
      currentImageName = "rainy-6";
    } else if (data.current.weather_code === 56) {
      console.log("Light freezing drizzle");
      currentImageName = "rainy-7";
    } else if (data.current.weather_code === 57) {
      console.log("Dense freezing drizzle");
      currentImageName = "rainy-7";
    } else if (data.current.weather_code === 61) {
      console.log("Slight rain");
      currentImageName = "rainy-4";
    } else if (data.current.weather_code === 63) {
      console.log("Moderate rain");
      currentImageName = "rainy-5";
    } else if (data.current.weather_code === 65) {
      console.log("Heavy rain");
      currentImageName = "rainy-6";
    } else if (data.current.weather_code === 66) {
      console.log("Light freezing rain");
      currentImageName = "rainy-7";
    } else if (data.current.weather_code === 67) {
      console.log("Heavy freezing rain");
      currentImageName = "rainy-7";
    } else if (data.current.weather_code === 71) {
      console.log("Slight snow fall");
      currentImageName = "snowy-4";
    } else if (data.current.weather_code === 73) {
      console.log("Moderate snow fall");
      currentImageName = "snowy-5";
    } else if (data.current.weather_code === 75) {
      console.log("Heavy snow fall");
      currentImageName = "snowy-6";
    } else if (data.current.weather_code === 77) {
      console.log("Snow grains");
      currentImageName = "snowy-4";
    } else if (data.current.weather_code === 80) {
      console.log("Slight rain showers");
      currentImageName = "rainy-1";
    } else if (data.current.weather_code === 81) {
      console.log("Moderate rain showers");
      currentImageName = "rainy-2";
    } else if (data.current.weather_code === 82) {
      console.log("Heavy rain showers");
      currentImageName = "rainy-3";
    } else if (data.current.weather_code === 85) {
      console.log("Slight snow showers");
      currentImageName = "snowy-1";
    } else if (data.current.weather_code === 86) {
      console.log("Heavy snow showers");
      currentImageName = "snowy-3";
    } else if (data.current.weather_code === 95) {
      console.log("Slight or moderate thunderstorm");
      currentImageName = "thunder";
    } else if (data.current.weather_code === 96) {
      console.log("Thunderstorm with slight hail");
      currentImageName = "thunder";
    } else if (data.current.weather_code === 99) {
      console.log("Thunderstorm with heavy hail");
      currentImageName = "thunder";
    } else {
      currentImageName = "weather";
    }
  }

  weatherCodes();
  currentImage.style.backgroundImage = `url(./images/animated/${currentImageName}.svg)`;
  currentTemp.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;
  currentWind.textContent = `${data.current.wind_speed_10m}${data.current_units.wind_speed_10m}`;

  //   const abc = data.hourly.temperature_2m;

  //   for (let inc = 0; inc < 24; inc++) {
  //     let temp = 0;
  //     for (let i = 24 + inc * 6; i < 30 + inc * 6; i++) {
  //       // console.log(data.hourly.temperature_2m[i]);
  //       temp += data.hourly.temperature_2m[i];
  //     }
  //     console.log(Math.round(temp / 6));
  //   }

  for (let days = 0; days < 6; days++) {
    const day = document.createElement("div");
    const dayName = document.createElement("p");
    day.classList.add("day");
    dayName.textContent = `Day ${days + 2}`;
    day.append(dayName);
    for (
      let quarterOfDay = 0 + days * 4;
      quarterOfDay < 4 + days * 4;
      quarterOfDay++
    ) {
      let temp = 0;
      //   Loop over one quarter of a day (6 hours) at a time and calculate averages
      for (
        let hour = 24 + quarterOfDay * 6;
        hour < 30 + quarterOfDay * 6;
        hour++
      ) {
        temp += data.hourly.temperature_2m[hour];
      }
      averageTemp = Math.round(temp / 6);

      const quarter = document.createElement("div");
      const quarterWeatherCode = document.createElement("img");
      const quarterTemp = document.createElement("p");

      //   quarterWeatherCode.src =
      quarterTemp.textContent = `${averageTemp}${data.hourly_units.temperature_2m}`;
      day.append(quarterTemp);
    }
    week.append(day);
  }
}
