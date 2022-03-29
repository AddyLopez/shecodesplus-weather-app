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

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-5 column-${index}">
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
           High: <span class="temperature-high-${index}">${Math.round(
          forecastDay.temp.max
        )}</span
          ><span class="temperature-units-3">°F</span>
            <br />
            Low: <span class="temperature-low-${index}">${Math.round(
          forecastDay.temp.min
        )}</span><span class="temperature-units-4">°F</span>
            </p>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;

  function formatColumns() {
    let icons = [
      "01d",
      "01n",
      "02d",
      "02n",
      "03d",
      "03n",
      "04d",
      "04n",
      "09d",
      "09n",
      "10d",
      "10n",
      "11d",
      "11n",
      "50d",
      "50n",
      "13d",
      "13n",
    ];
    forecastData.forEach(function (forecastDay, index) {
      if (index < 7) {
        let column = document.querySelector(`.column-${index}`);
        let icon = forecastDay.weather[0].icon;
        if (icon === icons[0] || icon === icons[1]) {
          column.setAttribute("class", `col-5 column-${index} clear-sky-icons`);
        } else {
          if (icon === icons[2] || icon === icons[3]) {
            column.setAttribute(
              "class",
              `col-5 column-${index} few-clouds-icons`
            );
          } else {
            if (icon === icons[4] || icon === icons[5]) {
              column.setAttribute(
                "class",
                `col-5 column-${index} scattered-clouds-icons`
              );
            } else {
              if (icon === icons[6] || icon === icons[7]) {
                column.setAttribute(
                  "class",
                  `col-5 column-${index} broken-clouds-icons`
                );
              } else {
                if (icon === icons[8] || icon === icons[9]) {
                  column.setAttribute(
                    "class",
                    `col-5 column-${index} drizzle-icons`
                  );
                } else {
                  if (icon === icons[10] || icon === icons[11]) {
                    column.setAttribute(
                      "class",
                      `col-5 column-${index} rain-icons`
                    );
                  } else {
                    if (icon === icons[12] || icon === icons[13]) {
                      column.setAttribute(
                        "class",
                        `col-5 column-${index} thunderstorm-icons`
                      );
                    } else {
                      if (icon === icons[14] || icon === icons[15]) {
                        column.setAttribute(
                          "class",
                          `col-5 column-${index} haze-icons`
                        );
                      } else {
                        if (icon === icons[16] || icon === icons[17]) {
                          column.setAttribute(
                            "class",
                            `col-5 column-${index} snow-icons`
                          );
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  function getCelsius() {
    function showCelsiusUnits(unitsElement) {
      unitsElement.innerHTML = "°C";
    }
    function showCelsiusTemperature() {
      forecastData.forEach(function (forecastDay, index) {
        if (index < 7) {
          let celsiusHigh = document.querySelector(
            `.temperature-high-${index}`
          );
          let celsiusLow = document.querySelector(`.temperature-low-${index}`);
          celsiusHigh.innerHTML = Math.round(
            (5 / 9) * (forecastDay.temp.max - 32)
          );
          celsiusLow.innerHTML = Math.round(
            (5 / 9) * (forecastDay.temp.min - 32)
          );
        }
      });
    }

    let unitsHigh = document.querySelectorAll(".temperature-units-3");
    let unitsLow = document.querySelectorAll(".temperature-units-4");
    unitsHigh.forEach(showCelsiusUnits);
    unitsLow.forEach(showCelsiusUnits);

    showCelsiusTemperature();
  }

  function getFahrenheit() {
    function showFahrenheitUnits(unitsElement) {
      unitsElement.innerHTML = "°F";
    }

    function showFahrenheitTemperature() {
      forecastData.forEach(function (forecastDay, index) {
        if (index < 7) {
          let fahrenheitHigh = document.querySelector(
            `.temperature-high-${index}`
          );
          let fahrenheitLow = document.querySelector(
            `.temperature-low-${index}`
          );
          fahrenheitHigh.innerHTML = Math.round(forecastDay.temp.max);
          fahrenheitLow.innerHTML = Math.round(forecastDay.temp.min);
        }
      });
    }

    let unitsHigh = document.querySelectorAll(".temperature-units-3");
    let unitsLow = document.querySelectorAll(".temperature-units-4");
    unitsHigh.forEach(showFahrenheitUnits);
    unitsLow.forEach(showFahrenheitUnits);
    showFahrenheitTemperature();
  }

  function temperatureButtons() {
    let celsiusButton = document.querySelector("#button-celsius");
    let fahrenheitButton = document.querySelector("#button-fahrenheit");
    celsiusButton.addEventListener("click", getCelsius);
    fahrenheitButton.addEventListener("click", getFahrenheit);
  }
  temperatureButtons();
  formatColumns();
}

function getForecast(coordinates) {
  let apiKey = `59446b2366c35cbe45d81fb3e3545297`;
  let units = `imperial`;
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherConditions(response) {
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

  let icon = response.data.weather[0].icon;
  document.querySelector(
    "#main-icon"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"/>`;

  function displayMainBackground() {
    let icons = [
      "01d",
      "01n",
      "02d",
      "02n",
      "03d",
      "03n",
      "04d",
      "04n",
      "09d",
      "09n",
      "10d",
      "10n",
      "11d",
      "11n",
      "50d",
      "50n",
      "13d",
      "13n",
    ];
    let mainBackground = document.querySelector("#main-background");
    if (icon === icons[0] || icon === icons[1]) {
      mainBackground.setAttribute("class", "search-results clear-sky-icons");
    } else {
      if (icon === icons[2] || icon === icons[3]) {
        mainBackground.setAttribute("class", "search-results few-clouds-icons");
      } else {
        if (icon === icons[4] || icon === icons[5]) {
          mainBackground.setAttribute(
            "class",
            "search-results scattered-clouds-icons"
          );
        } else {
          if (icon === icons[6] || icon === icons[7]) {
            mainBackground.setAttribute(
              "class",
              "search-results broken-clouds-icons"
            );
          } else {
            if (icon === icons[8] || icon === icons[9]) {
              mainBackground.setAttribute(
                "class",
                "search-results drizzle-icons"
              );
            } else {
              if (icon === icons[10] || icon === icons[11]) {
                mainBackground.setAttribute(
                  "class",
                  "search-results rain-icons"
                );
              } else {
                if (icon === icons[12] || icon === icons[13]) {
                  mainBackground.setAttribute(
                    "class",
                    "search-results thunderstorm-icons"
                  );
                } else {
                  if (icon === icons[14] || icon === icons[15]) {
                    mainBackground.setAttribute(
                      "class",
                      "search-results haze-icons"
                    );
                  } else {
                    if (icon === icons[16] || icon === icons[17]) {
                      mainBackground.setAttribute(
                        "class",
                        "search-results snow-icons"
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  displayMainBackground();
}

function displayTemperature(response) {
  let temperature = response.data.main.temp;
  let feelsLikeTemperature = response.data.main.feels_like;
  let subHeading = document.querySelector("#current-temperature");
  subHeading.innerHTML = Math.round(temperature);
  document.querySelector("#temperature-units-1").innerHTML = "°F";
  document.querySelector("#temperature-units-2").innerHTML = "°F";

  function getCelsius() {
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

  function getFahrenheit() {
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
  searchCity(cityInputValue);
}

function useLocationButton() {
  function displayCurrentLocationTemp(response) {
    let temperature = response.data.main.temp;
    let feelsLikeTemperature = response.data.main.feels_like;
    let cityName = response.data.name;
    let subHeading = document.querySelector("#current-temperature");
    subHeading.innerHTML = Math.round(temperature);
    document.querySelector("#heading-one").innerHTML = `${cityName}`;
    document.querySelector("#temperature-units-1").innerHTML = "°F";
    document.querySelector("#temperature-units-2").innerHTML = "°F";

    function getCelsius() {
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

    function getFahrenheit() {
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
