//DOM
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");

//API key
var apiKey = "ce1c48f71cdacb01f64b2ae634d3fb62";


var formSubmitHandler = function(event){
    event.preventDefault();
    console.log(event)
};


cityFormEl.addEventListener("submit", formSubmitHandler);