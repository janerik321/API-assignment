const main = document.querySelector("main");
const titleLocation = document.querySelector("#title-location");
const currentLocation = document.querySelector("#location");
const current = document.querySelector("#current");
const currentImage = document.querySelector("#current-image");
const currentTempWind = document.querySelector("#current-temp-wind");
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const today = document.querySelector("#today");
const week = document.querySelector("#week");
const currentTime = new Date();
currentLocation.textContent = "Stavanger";

console.log(
  "Weather icons downloaded from amCharts: https://www.amcharts.com/free-animated-svg-weather-icons/"
);

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

function construct(data) {
  let imageName = "";

  function weatherCodes(timeframe) {
    let weatherCodeTimeframe;
    if (timeframe === "current") {
      weatherCodeTimeframe = data.current.weather_code;
    } else if (timeframe === "hourly") {
      weatherCodeTimeframe = data.hourly.weather_code[i];
    }
    if (weatherCodeTimeframe === 0) {
      console.log("Clear sky");
      imageName = "day";
    } else if (weatherCodeTimeframe === 1) {
      console.log("Mainly clear");
      imageName = "cloudy-day-1";
    } else if (weatherCodeTimeframe === 2) {
      console.log("Partly cloudy");
      imageName = "cloudy-day-2";
    } else if (weatherCodeTimeframe === 3) {
      console.log("Overcast");
      imageName = "cloudy";
    } else if (weatherCodeTimeframe === 45) {
      console.log("Fog");
      imageName = "cloudy";
    } else if (weatherCodeTimeframe === 48) {
      console.log("Depositing rime fog");
      imageName = "cloudy";
    } else if (weatherCodeTimeframe === 51) {
      console.log("Light drizzle");
      imageName = "rainy-4";
    } else if (weatherCodeTimeframe === 53) {
      console.log("Moderate drizzle");
      imageName = "rainy-5";
    } else if (weatherCodeTimeframe === 55) {
      console.log("Dense drizzle");
      imageName = "rainy-6";
    } else if (weatherCodeTimeframe === 56) {
      console.log("Light freezing drizzle");
      imageName = "rainy-7";
    } else if (weatherCodeTimeframe === 57) {
      console.log("Dense freezing drizzle");
      imageName = "rainy-7";
    } else if (weatherCodeTimeframe === 61) {
      console.log("Slight rain");
      imageName = "rainy-4";
    } else if (weatherCodeTimeframe === 63) {
      console.log("Moderate rain");
      imageName = "rainy-5";
    } else if (weatherCodeTimeframe === 65) {
      console.log("Heavy rain");
      imageName = "rainy-6";
    } else if (weatherCodeTimeframe === 66) {
      console.log("Light freezing rain");
      imageName = "rainy-7";
    } else if (weatherCodeTimeframe === 67) {
      console.log("Heavy freezing rain");
      imageName = "rainy-7";
    } else if (weatherCodeTimeframe === 71) {
      console.log("Slight snow fall");
      imageName = "snowy-4";
    } else if (weatherCodeTimeframe === 73) {
      console.log("Moderate snow fall");
      imageName = "snowy-5";
    } else if (weatherCodeTimeframe === 75) {
      console.log("Heavy snow fall");
      imageName = "snowy-6";
    } else if (weatherCodeTimeframe === 77) {
      console.log("Snow grains");
      imageName = "snowy-4";
    } else if (weatherCodeTimeframe === 80) {
      console.log("Slight rain showers");
      imageName = "rainy-1";
    } else if (weatherCodeTimeframe === 81) {
      console.log("Moderate rain showers");
      imageName = "rainy-2";
    } else if (weatherCodeTimeframe === 82) {
      console.log("Heavy rain showers");
      imageName = "rainy-3";
    } else if (weatherCodeTimeframe === 85) {
      console.log("Slight snow showers");
      imageName = "snowy-1";
    } else if (weatherCodeTimeframe === 86) {
      console.log("Heavy snow showers");
      imageName = "snowy-3";
    } else if (weatherCodeTimeframe === 95) {
      console.log("Slight or moderate thunderstorm");
      imageName = "thunder";
    } else if (weatherCodeTimeframe === 96) {
      console.log("Thunderstorm with slight hail");
      imageName = "thunder";
    } else if (weatherCodeTimeframe === 99) {
      console.log("Thunderstorm with heavy hail");
      imageName = "thunder";
    } else {
      imageName = "weather";
    }
  }

  weatherCodes("current");
  currentImage.style.backgroundImage = `url(img/animated/${imageName}.svg)`;
  currentTemp.textContent = `${Math.round(data.current.temperature_2m)}${
    data.current_units.temperature_2m
  }`;
  currentWind.textContent = `${Math.round(data.current.wind_speed_10m)}${
    data.current_units.wind_speed_10m
  }`;

  for (
    i = currentTime.getHours() + 4;
    i < currentTime.getHours() + 24 + 4;
    i += 4
  ) {
    console.log(data.hourly.weather_code[i]);
    const weatherToday = document.createElement("div");
    const weatherCodesToday = document.createElement("div");
    const temperatureToday = document.createElement("p");
    const hourToday = document.createElement("p");
    weatherToday.classList.add("weather-today");
    hourToday.classList.add("hour-today");
    weatherCodesToday.classList.add("weather-codes-today");

    weatherCodes("hourly");
    weatherCodesToday.style.backgroundImage = `url(img/static/${imageName}.svg)`;

    temperatureToday.textContent =
      Math.round(data.hourly.temperature_2m[i]) +
      data.hourly_units.temperature_2m;
    // let zero = "0";
    // if ((i = 10 || i <= 24)) {
    //   zero = "";
    //   d;
    // }

    if (i > 23) {
      hourToday.textContent = `${i - 24}:00`;
    } else {
      hourToday.textContent = `${i}:00`;
    }
    weatherToday.append(weatherCodesToday, temperatureToday, hourToday);
    today.append(weatherToday);
  }

  // Fill in the rest of the week
  for (let days = 0; days < 6; days++) {
    const day = document.createElement("div");
    const dayName = document.createElement("p");
    const dayCalc = currentTime.getDay() + days + 1;
    day.classList.add("day");
    dayName.classList.add("day-name");

    if (dayCalc === 0 || dayCalc === 7) {
      dayName.textContent = "Sunday";
    } else if (dayCalc === 1 || dayCalc === 8) {
      dayName.textContent = "Monday";
    } else if (dayCalc === 2 || dayCalc === 9) {
      dayName.textContent = "Tuesday";
    } else if (dayCalc === 3 || dayCalc === 10) {
      dayName.textContent = "Wednesday";
    } else if (dayCalc === 4 || dayCalc === 11) {
      dayName.textContent = "Thursday";
    } else if (dayCalc === 5 || dayCalc === 12) {
      dayName.textContent = "Friday";
    } else if (dayCalc === 6 || dayCalc === 13) {
      dayName.textContent = "Saturday";
    }

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
      const quarterWeatherCode = document.createElement("div");
      const quarterTemp = document.createElement("p");
      quarter.classList.add("quarter");
      quarterWeatherCode.classList.add("quarter-weather-code");

      weatherCodes("hourly");
      quarterWeatherCode.style.backgroundImage = `url(img/static/${imageName}.svg)`;

      quarterTemp.textContent = `${averageTemp}${data.hourly_units.temperature_2m}`;
      // quarter.append(quarterWeatherCode, quarterTemp);
      quarter.append(quarterTemp);
      day.append(quarter);
    }
    week.append(day);
  }
}

console.log(currentTime.getDay());
