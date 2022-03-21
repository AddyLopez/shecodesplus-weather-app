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

function displayWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "mph";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let subHeading = document.querySelector("#current-temperature");
  subHeading.innerHTML = `${temperature}`;
  document.querySelector("#temperature-units-1").innerHTML = "°F";

  function getCelsius(event) {
    let celsius = Math.round((5 / 9) * (temperature - 32));
    document.querySelector("#temperature-units").innerHTML = "°C";
    subHeading.innerHTML = `${celsius}`;
  }
  function getFahrenheit(event) {
    document.querySelector("#temperature-units-1").innerHTML = "°F";
    subHeading.innerHTML = `${temperature}`;
  }
  function temperatureButtons() {
    let celsiusButton = document.querySelector("#button-celsius");
    let fahrenheitButton = document.querySelector("#button-fahrenheit");
    celsiusButton.addEventListener("click", getCelsius);
    fahrenheitButton.addEventListener("click", getFahrenheit);
  }
  temperatureButtons();
  displayWeatherConditions(response);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function useLocationButton(event) {
  function displayCurrentLocationTemp(response) {
    console.log(response.data.name);
    let temperature = Math.round(response.data.main.temp);
    let cityName = response.data.name;
    document.querySelector("#heading-one").innerHTML = `${cityName}`;
    document.querySelector("#current-temperature").innerHTML = `${temperature}`;
    document.querySelector("#temperature-units").innerHTML = "°F";

    function getCelsius(event) {
      let celsius = Math.round((5 / 9) * (temperature - 32));
      temperatureHeading.innerHTML = `${celsius}`;
      document.querySelector("#temperature-units-1").innerHTML = "°C";
    }
    function getFahrenheit(event) {
      temperatureHeading.innerHTML = `${temperature}`;
      document.querySelector("#temperature-units-1").innerHTML = "°F";
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

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", useLocationButton);

displayDate();
displayWeekdayAndTime();
searchCity("New York");
