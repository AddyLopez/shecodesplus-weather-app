function displayDate() {
  let dateToday = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[dateToday.getMonth()];
  let date = dateToday.getDate();
  let year = dateToday.getFullYear();
  document.querySelector("#month").innerHTML = `${month}`;
  document.querySelector("#date").innerHTML = `${date}`;
  document.querySelector("#year").innerHTML = `${year}`;
}

function displayWeekdayAndTime() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let dayTime = document.querySelector("#current-day-time");

  if (minutes < 10) {
    minutes = "0" + currentDate.getMinutes();
  }
  if (hour >= 0 && hour < 12) {
    let anteMeridiem = "a.m.";
    if (hour === 0) {
      hour = "12";
    }
    dayTime.innerHTML = `${day} ${hour}:${minutes} ${anteMeridiem}`;
  } else {
    let postMeridiem = "p.m.";
    if (hour === 12) {
      dayTime.innerHTML = `${day} ${hour}:${minutes} ${postMeridiem}`;
    } else {
      if (hour > 12 && hour < 25) {
        let afternoon = hour - 12;
        dayTime.innerHTML = `${day} ${afternoon}:${minutes} ${postMeridiem}`;
      }
    }
  }
}

function formatForecastDate(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let forecastDay = forecastDate.getDay();
  let forecastDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return forecastDays[forecastDay];
}

function displayWeatherConditions(response) {
  let icon = response.data.weather[0].icon;
  document.querySelector(
    "#main-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"/>`;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#wind-units").innerHTML = " mph";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function displayForecast(response) {
  console.log(response.data);
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-5 neutral">
        <p>
          <span class="weekday">${formatForecastDate(forecastDay.dt)}</span>
          <br />
         <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
                alt="weather icon"
              />
          <br />
           High: <span id="temperature-high">${Math.round(
             forecastDay.temp.max
           )}</span
          ><span id="temperature-units-3">°F</span>
            <br />
            Low: <span id="temperature-low">${Math.round(
              forecastDay.temp.min
            )}</span><span id="temperature-units-4">°F</span>
            </p>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `59446b2366c35cbe45d81fb3e3545297`;
  let units = `imperial`;
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperature = response.data.main.temp;
  let feelsLikeTemperature = response.data.main.feels_like;
  let subHeading = document.querySelector("#current-temperature");
  subHeading.innerHTML = Math.round(temperature);
  document.querySelector("#temperature-units-1").innerHTML = "°F";
  document.querySelector("#temperature-units-2").innerHTML = "°F";

  function getCelsius(event) {
    let celsius = Math.round((5 / 9) * (temperature - 32));
    let celsiusFeelsLike = Math.round((5 / 9) * (feelsLikeTemperature - 32));
    document.querySelector("#temperature-units-1").innerHTML = "°C";
    document.querySelector("#temperature-units-2").innerHTML = "°C";
    subHeading.innerHTML = `${celsius}`;
    document.querySelector("#feels-like").innerHTML = `${celsiusFeelsLike}`;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed * 1.609
    );
    document.querySelector("#wind-units").innerHTML = " km/h";
  }
  function getFahrenheit(event) {
    document.querySelector("#temperature-units-1").innerHTML = "°F";
    document.querySelector("#temperature-units-2").innerHTML = "°F";
    subHeading.innerHTML = Math.round(temperature);
    document.querySelector("#feels-like").innerHTML =
      Math.round(feelsLikeTemperature);
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#wind-units").innerHTML = " mph";
  }
  function temperatureButtons() {
    let celsiusButton = document.querySelector("#button-celsius");
    let fahrenheitButton = document.querySelector("#button-fahrenheit");
    celsiusButton.addEventListener("click", getCelsius);
    fahrenheitButton.addEventListener("click", getFahrenheit);
  }
  temperatureButtons();
  displayWeatherConditions(response);
  getForecast(response.data.coord);
}

function searchCity(city) {
  if (city) {
    document.querySelector("#heading-one").innerHTML = `${city}`;
  } else {
    alert("Please type in the name of a city for the weather.");
  }
  let units = "imperial";
  let apiKey = "59446b2366c35cbe45d81fb3e3545297";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputValue = document.querySelector("#search-input").value;
  console.log(cityInputValue);
  searchCity(cityInputValue);
}

function useLocationButton(event) {
  function displayCurrentLocationTemp(response) {
    console.log(response.data);
    let temperature = response.data.main.temp;
    let feelsLikeTemperature = response.data.main.feels_like;
    let cityName = response.data.name;
    let subHeading = document.querySelector("#current-temperature");
    subHeading.innerHTML = Math.round(temperature);
    document.querySelector("#heading-one").innerHTML = `${cityName}`;
    document.querySelector("#temperature-units-1").innerHTML = "°F";
    document.querySelector("#temperature-units-2").innerHTML = "°F";

    function getCelsius(event) {
      let celsius = Math.round((5 / 9) * (temperature - 32));
      let celsiusFeelsLike = Math.round((5 / 9) * (feelsLikeTemperature - 32));
      document.querySelector("#temperature-units-1").innerHTML = "°C";
      document.querySelector("#temperature-units-2").innerHTML = "°C";
      subHeading.innerHTML = `${celsius}`;
      document.querySelector("#feels-like").innerHTML = `${celsiusFeelsLike}`;
      document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed * 1.609
      );
      document.querySelector("#wind-units").innerHTML = " km/h";
    }
    function getFahrenheit(event) {
      subHeading.innerHTML = `${Math.round(temperature)}`;
      document.querySelector("#temperature-units-1").innerHTML = "°F";
      document.querySelector("#temperature-units-2").innerHTML = "°F";
      document.querySelector("#feels-like").innerHTML =
        Math.round(feelsLikeTemperature);
      document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
      );
      document.querySelector("#wind-units").innerHTML = " mph";
    }

    function temperatureButtons() {
      let celsiusButton = document.querySelector("#button-celsius");
      let fahrenheitButton = document.querySelector("#button-fahrenheit");
      celsiusButton.addEventListener("click", getCelsius);
      fahrenheitButton.addEventListener("click", getFahrenheit);
    }
    temperatureButtons();
    displayWeatherConditions(response);
    getForecast(response.data.coord);
  }

  function getCurrentLocation(position) {
    alert("Wait just a moment, please...");
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "imperial";
    let apiKey = "59446b2366c35cbe45d81fb3e3545297";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayCurrentLocationTemp);
  }
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", useLocationButton);

displayDate();
displayWeekdayAndTime();
searchCity("New York");
