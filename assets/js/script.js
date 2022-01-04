//DOM
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");
var currentWeatherEl = document.querySelector("#current-weather-container");
var citySearchEl = document.querySelector("#city-search")

var cities = "";
var cityNames = [];

//API key https://home.openweathermap.org/api_keys
var apiKey = "ce1c48f71cdacb01f64b2ae634d3fb62";

// information from weather form
var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();

    if (city) {
        cityWeather(city);
        getWeekWeather(city);
        cityNames.unshift({city});
        cityWeather.value = "";
    } else {
        alert("Enter a City");
    };

    citySave();
    
};

// save to local storage
var citySave = function() {
    localStorage.setItem("cityNames",JSON.stringify(cityNames));
};

//get weather from weather API
function getWeather(cityName){
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}";
    var apiKey = "ce1c48f71cdacb01f64b2ae634d3fb62";

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

//display weather in container

var showWeather = function(citySearch, weather){

    currentWeatherEl.textContent="";
    citySearchEl.classList= citySearch;

    var currentDate = document.createElement("span");

    currentDate.textContent = 
     "(" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";

    citySearchEl.appendChild(currentDate);

    var weatherIcons = document.createElement("img")
        weatherIcons.setAttribute(
            "src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchEl.appendChild(weatherIcons);

    var tempEl = document.createElement("span");
        tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
    tempEl.classList = "list-group-item";

    var humidEl = document.createElement("span");
        humidEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidEl.classList = "list-group-item";
    
    currentWeatherEl.appendChild(tempEl);
    currentWeatherEl.appendChild(humidEl);
    currentWeatherEl.appendChild(windEl);
    
    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    getUvIndex(lon, lat);

};
    
//uv index

// week weather

// display week of weather

// display previous cities weather



cityFormEl.addEventListener("submit", formSubmitHandler);