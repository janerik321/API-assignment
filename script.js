const body = document.querySelector("body");
const main = document.querySelector("main");
const titleLocation = document.querySelector("#title-location");
const dayNightButton = document.querySelector("#day-night-button");
const locationEdit = document.querySelector("#location-edit");
let currentLocation = document.querySelector("#location");
const locationInteraction = document.querySelector("#location-interaction");
const locationSearch = document.querySelector("#location-search");
const locationInput = document.querySelector("#location-input");
const locationResult = document.querySelector("#location-result");
const current = document.querySelector("#current");
const currentImage = document.querySelector("#current-image");
const currentTempWind = document.querySelector("#current-temp-wind");
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const today = document.querySelector("#today");
const week = document.querySelector("#week");
let currentTime = new Date();
const localTime = document.querySelector("#local-time");
let nightMode = false;

console.log(
  "Weather icons downloaded from amCharts: https://www.amcharts.com/free-animated-svg-weather-icons/"
);

locationEdit.style.display = "none";
locationResult.style.display = "none";

const storedData = localStorage.getItem("storedLocation");
if (storedData) {
  const locationInfo = JSON.parse(storedData);
  // console.log(locationInfo);
  getWeatherData(locationInfo.latitude, locationInfo.longitude);
  locationInteraction.style.display = "none";
  locationEdit.style.display = "flex";
  currentLocation.textContent = `${locationInfo.name}${locationInfo.admin1}`;
}

// Fetching location data (latitude & longitude)
async function getLocationData(location) {
  try {
    const jsonLocationFetch = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`
    );
    const locationData = await jsonLocationFetch.json();

    console.log(locationData);

    searchResults(locationData);
  } catch (err) {
    console.log(err);
  }
}

function searchResults(locationData) {
  while (locationResult.firstChild) {
    locationResult.firstChild.remove();
  }
  locationData.results.forEach((e) => {
    // console.log(e.name + e.country);
    const searchOption = document.createElement("p");

    // Checking to see if e.admin1 and e.country exists. If not, they are created and given the value "" to avoid displaying "undefined".
    // If they do exist, commas are added.
    if (!e.admin1) {
      e.admin1 = "";
    } else if (e.admin1 !== "") {
      e.admin1 = `, ${e.admin1}`;
    }
    if (!e.country) {
      e.country = "";
      console.log(e.country + "emptyCountry");
    } else if (e.country !== "") {
      e.country = `, ${e.country}`;
    }
    searchOption.textContent = `${e.name}${e.admin1}${e.country}`;
    locationResult.append(searchOption);
    searchOption.addEventListener("click", () => {
      getWeatherData(e.latitude, e.longitude);
      currentLocation.textContent = `${e.name}${e.admin1}`;

      localStorage.setItem("storedLocation", JSON.stringify(e));

      while (locationResult.firstChild) {
        locationResult.firstChild.remove();
      }
      while (today.firstChild) {
        today.firstChild.remove();
      }
      while (week.firstChild) {
        week.firstChild.remove();
      }
      // locationInteraction.style.display = "none";
      // locationResult.style.display = "none";
      // locationEdit.style.display = "flex";
      removeSearch();
    });
  });
}

// Fetching weather data
async function getWeatherData(latitude, longitude) {
  try {
    const jsonWeatherFetch = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&wind_speed_unit=ms&timezone=auto`
    );
    const weatherData = await jsonWeatherFetch.json();

    console.log(weatherData);
    construct(weatherData);
  } catch (err) {
    console.log(err);
  }
}

// Creating and appending weather data
function construct(data) {
  let imageName = "";
  if (data.current.is_day === 1) {
    main.style.background =
      "linear-gradient(to bottom, rgb(62, 98, 214), white)";
    localTime.style.color = "rgba(255, 255, 255, 0.7)";
  } else if (data.current.is_day === 0) {
    main.style.background =
      "linear-gradient(to bottom, rgb(12, 19, 40), rgb(62, 98, 214))";
    localTime.style.color = "rgba(255, 255, 255, 0.55)";
  }

  function weatherCodes(timeframe, index) {
    let weatherCodeTimeframe;
    let isDay;
    if (timeframe === "current") {
      weatherCodeTimeframe = data.current.weather_code;
      isDay = data.current.is_day;
    } else if (timeframe === "hourly") {
      weatherCodeTimeframe = data.hourly.weather_code[index];
      isDay = data.hourly.is_day[index];
    }
    if (weatherCodeTimeframe === 0 && isDay === 1) {
      // console.log("Clear sky");
      imageName = "day";
    } else if (weatherCodeTimeframe === 0 && isDay === 0) {
      imageName = "night";
    } else if (weatherCodeTimeframe === 1 && isDay === 1) {
      // console.log("Mainly clear");
      imageName = "cloudy-day-1";
    } else if (weatherCodeTimeframe === 1 && isDay === 0) {
      imageName = "cloudy-night-1";
    } else if (weatherCodeTimeframe === 2 && isDay === 1) {
      // console.log("Partly cloudy");
      imageName = "cloudy-day-2";
    } else if (weatherCodeTimeframe === 2 && isDay === 0) {
      imageName = "cloudy-night-2";
    } else if (weatherCodeTimeframe === 3) {
      // console.log("Overcast");
      imageName = "cloudy";
    } else if (weatherCodeTimeframe === 45) {
      // console.log("Fog");
      imageName = "cloudy";
    } else if (weatherCodeTimeframe === 48) {
      // console.log("Depositing rime fog");
      imageName = "cloudy";
    } else if (weatherCodeTimeframe === 51) {
      // console.log("Light drizzle");
      imageName = "rainy-4";
    } else if (weatherCodeTimeframe === 53) {
      // console.log("Moderate drizzle");
      imageName = "rainy-5";
    } else if (weatherCodeTimeframe === 55) {
      // console.log("Dense drizzle");
      imageName = "rainy-6";
    } else if (weatherCodeTimeframe === 56) {
      // console.log("Light freezing drizzle");
      imageName = "rainy-7";
    } else if (weatherCodeTimeframe === 57) {
      // console.log("Dense freezing drizzle");
      imageName = "rainy-7";
    } else if (weatherCodeTimeframe === 61) {
      // console.log("Slight rain");
      imageName = "rainy-4";
    } else if (weatherCodeTimeframe === 63) {
      // console.log("Moderate rain");
      imageName = "rainy-5";
    } else if (weatherCodeTimeframe === 65) {
      // console.log("Heavy rain");
      imageName = "rainy-6";
    } else if (weatherCodeTimeframe === 66) {
      // console.log("Light freezing rain");
      imageName = "rainy-7";
    } else if (weatherCodeTimeframe === 67) {
      // console.log("Heavy freezing rain");
      imageName = "rainy-7";
    } else if (weatherCodeTimeframe === 71) {
      // console.log("Slight snow fall");
      imageName = "snowy-4";
    } else if (weatherCodeTimeframe === 73) {
      // console.log("Moderate snow fall");
      imageName = "snowy-5";
    } else if (weatherCodeTimeframe === 75) {
      // console.log("Heavy snow fall");
      imageName = "snowy-6";
    } else if (weatherCodeTimeframe === 77) {
      // console.log("Snow grains");
      imageName = "snowy-4";
    } else if (weatherCodeTimeframe === 80 && isDay === 1) {
      // console.log("Slight rain showers");
      imageName = "rainy-1";
    } else if (weatherCodeTimeframe === 80 && isDay === 0) {
      imageName = "rainy-4";
    } else if (weatherCodeTimeframe === 81 && isDay === 1) {
      // console.log("Moderate rain showers");
      imageName = "rainy-2";
    } else if (weatherCodeTimeframe === 81 && isDay === 0) {
      imageName = "rainy-5";
    } else if (weatherCodeTimeframe === 82 && isDay === 1) {
      // console.log("Heavy rain showers");
      imageName = "rainy-3";
    } else if (weatherCodeTimeframe === 82 && isDay === 0) {
      imageName = "rainy-6";
    } else if (weatherCodeTimeframe === 85 && isDay === 1) {
      // console.log("Slight snow showers");
      imageName = "snowy-1";
    } else if (weatherCodeTimeframe === 85 && isDay === 0) {
      imageName = "snowy-4";
    } else if (weatherCodeTimeframe === 86 && isDay === 1) {
      // console.log("Heavy snow showers");
      imageName = "snowy-3";
    } else if (weatherCodeTimeframe === 86 && isDay === 0) {
      imageName = "snowy-6";
    } else if (weatherCodeTimeframe === 95) {
      // console.log("Slight or moderate thunderstorm");
      imageName = "thunder";
    } else if (weatherCodeTimeframe === 96) {
      // console.log("Thunderstorm with slight hail");
      imageName = "thunder";
    } else if (weatherCodeTimeframe === 99) {
      // console.log("Thunderstorm with heavy hail");
      imageName = "thunder";
    } else {
      imageName = "weather";
    }
  }

  // Set local time

  // exceedingMinutes & addHour is to account for locations where the timezone is offset in minutes in addition to hours.
  // This is to handle spillover in the local time display (e.g. 19:77 -> 20:17)
  currentTime = new Date();

  let exceedingMinutes =
    currentTime.getUTCMinutes() + (data.utc_offset_seconds % 3600) / 60;
  let addHour = 0;
  if (exceedingMinutes >= 60) {
    exceedingMinutes = exceedingMinutes - 60;
    addHour = 1;
  }

  localTime.textContent = `Local time: ${(
    currentTime.getUTCHours() +
    Math.floor(data.utc_offset_seconds / 3600) +
    addHour
  )
    .toString()
    .padStart(2, "0")}:${exceedingMinutes.toString().padStart(2, "0")}`;

  console.log(currentTime);
  // *************************

  weatherCodes("current");

  currentImage.style.backgroundImage = `url(img/animated/${imageName}.svg)`;
  currentTemp.textContent = `${Math.round(data.current.temperature_2m)}${
    data.current_units.temperature_2m
  }`;
  currentWind.textContent = `${Math.round(
    data.current.wind_speed_10m
  )}(${Math.round(data.current.wind_gusts_10m)})${
    data.current_units.wind_speed_10m
  }`;

  for (
    // let i = currentTime.getHours() + 4;
    // i < currentTime.getHours() + 24 + 4;

    // Math.floor() to fix issue with locations that have a utc offset not in whole hours
    let i = Math.floor(
      currentTime.getUTCHours() + data.utc_offset_seconds / 3600 + 4
    );
    i <
    Math.floor(
      currentTime.getUTCHours() + data.utc_offset_seconds / 3600 + 24 + 4
    );
    i += 4
  ) {
    // console.log(i);
    const weatherToday = document.createElement("div");
    const weatherCodesToday = document.createElement("div");
    const temperatureToday = document.createElement("p");
    const hourToday = document.createElement("p");
    weatherToday.classList.add("weather-today");
    hourToday.classList.add("hour-today");
    weatherCodesToday.classList.add("weather-codes-today");

    weatherCodes("hourly", i);
    weatherCodesToday.style.backgroundImage = `url(img/static/${imageName}.svg)`;

    temperatureToday.textContent =
      Math.round(data.hourly.temperature_2m[i]) +
      data.hourly_units.temperature_2m;

    if (i > 23) {
      hourToday.textContent = `${(i - 24).toString().padStart(2, "0")}:00`;
    } else {
      hourToday.textContent = `${i.toString().padStart(2, "0")}:00`;
    }
    weatherToday.append(weatherCodesToday, temperatureToday, hourToday);
    today.append(weatherToday);
  }

  // Fill in the rest of the week
  for (let days = 0; days < 6; days++) {
    const day = document.createElement("div");
    const dayName = document.createElement("p");
    // const dayCalc = currentTime.getDay() + days + 1;
    const dayCalc = currentTime.getUTCDay() + days + 1;
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

      // The "quarterOfDay * 6 + 2" parameter is to get the weather code for every 6 hours with a 26 hour offset(24 since we start on the following day + 2 since 2 is close to the middle of 0 and 5 (can't average weather codes)).
      weatherCodes("hourly", quarterOfDay * 6 + 26);

      quarterWeatherCode.style.backgroundImage = `url(img/static/${imageName}.svg)`;

      quarterTemp.textContent = `${averageTemp}${data.hourly_units.temperature_2m}`;
      quarter.append(quarterWeatherCode, quarterTemp);
      quarter.append(quarterTemp);
      day.append(quarter);
    }
    week.append(day);
  }
  // console.log(today.firstChild);
}

dayNightButton.addEventListener("click", () => {
  nightMode = !nightMode;
  if (nightMode) {
    body.style.backgroundColor = "rgb(40, 50, 75)";
    week.style.backgroundColor = "rgba(21, 26, 30, 0.9)";
    week.style.color = "rgba(255, 255, 255, 0.85)";
  } else if (!nightMode) {
    body.style.backgroundColor = "rgb(120, 150, 220)";
    week.style.backgroundColor = "rgba(235, 244, 252, 0.9)";
    week.style.color = "rgba(0, 0, 0, 0.8)";
  }
});

locationEdit.addEventListener("click", () => {
  locationInteraction.style.display = "inline-block";
  locationEdit.style.display = "none";
});

locationSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const locationValue = new FormData(locationSearch);
  getLocationData(locationValue.get("location-input"));
  locationResult.style.display = "inline-block";
});

function removeSearch() {
  locationInteraction.style.display = "none";
  locationResult.style.display = "none";
  locationEdit.style.display = "flex";
  // locationSearch.style.display = "none";
}

// console.log(currentTime.getUTCHours());
// console.log(currentTime.getUTCDay());
