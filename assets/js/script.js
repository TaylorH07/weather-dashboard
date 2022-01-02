var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");


var formSubmitHandler = function(event){
    event.preventDefault();
    console.log(event)
};


cityFormEl.addEventListener("submit", formSubmitHandler);