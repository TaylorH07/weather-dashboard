//DOM
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");
var 

var cities = "";
var cityNames = [];

//API key https://home.openweathermap.org/api_keys
var apiKey = "ce1c48f71cdacb01f64b2ae634d3fb62";

function getWeather(cityName){
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}";
    var apiKey = "ce1c48f71cdacb01f64b2ae634d3fb62"
};

// 
var formSubmitHandler = function(event){
    event.preventDefault();
    console.log(event)
};

// save to local storage
var citySave = function() {
    localStorage.setItem("cityNames",JSON.stringify(cityNames));
};


cityFormEl.addEventListener("submit", formSubmitHandler);