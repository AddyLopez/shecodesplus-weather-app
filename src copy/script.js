function displayDayAndTime() {
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

function displayTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let subHeading = document.querySelector("#current-temperature");
  subHeading.innerHTML = `${temperature}`;
  document.querySelector("#temperature-units").innerHTML = "°F";

  function getCelsius(event) {
    let celsius = Math.round((5 / 9) * (temperature - 32));
    document.querySelector("#temperature-units").innerHTML = "°C";
    subHeading.innerHTML = `${celsius}`;
  }
  function getFahrenheit(event) {
    document.querySelector("#temperature-units").innerHTML = "°F";
    subHeading.innerHTML = `${temperature}`;
  }
  function temperatureButtons() {
    let celsiusButton = document.querySelector("#button-celsius");
    let fahrenheitButton = document.querySelector("#button-fahrenheit");
    celsiusButton.addEventListener("click", getCelsius);
    fahrenheitButton.addEventListener("click", getFahrenheit);
  }
  temperatureButtons();
}

function searchCity(city) {
  let h1 = document.querySelector("h1");
  if (city) {
    h1.innerHTML = city;
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

displayDayAndTime();
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function useLocationButton(event) {
  function displayCurrentLocationTemp(response) {
    console.log(response.data.name);
    let temperature = Math.round(response.data.main.temp);
    let cityName = response.data.name;
    let h1 = document.querySelector("h1");
    let temperatureHeading = document.querySelector("#current-temperature");
    let fahrenheitUnits = document.querySelector("#temperature-units");
    fahrenheitUnits.innerHTML = "°F";
    h1.innerHTML = `${cityName}`;
    temperatureHeading.innerHTML = `${temperature}`;

    function getCelsius(event) {
      let celsius = Math.round((5 / 9) * (temperature - 32));
      temperatureHeading.innerHTML = `${celsius}`;
      document.querySelector("#temperature-units").innerHTML = "°C";
    }
    function getFahrenheit(event) {
      temperatureHeading.innerHTML = `${temperature}`;
      document.querySelector("#temperature-units").innerHTML = "°F";
    }

    function temperatureButtons() {
      let celsiusButton = document.querySelector("#button-celsius");
      let fahrenheitButton = document.querySelector("#button-fahrenheit");
      celsiusButton.addEventListener("click", getCelsius);
      fahrenheitButton.addEventListener("click", getFahrenheit);
    }
    temperatureButtons();
  }

  function getCurrentLocation(position) {
    alert("Wait just a moment, please...");
    let lat = Math.round(position.coords.latitude);
    let lon = Math.round(position.coords.longitude);
    let units = "imperial";
    let apiKey = "59446b2366c35cbe45d81fb3e3545297";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayCurrentLocationTemp);
  }
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", useLocationButton);

searchCity("New York");
