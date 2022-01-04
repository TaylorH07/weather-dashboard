//DOM
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");


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

    
//uv index

// week weather

// display week of weather

// display previous cities weather



cityFormEl.addEventListener("submit", formSubmitHandler);