//DOM
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");
var currentWeatherEl = document.querySelector("#current-weather-container");
var citySearchEl = document.querySelector("#city-search");
var forecastTitle = document.querySelector("#weather");
var fiveDayContainerEl = document.querySelector("#five-day-container");
var prevSearchBtn = document.querySelector("#search-history-btns")

var cityNames = [];

//API key https://home.openweathermap.org/api_keys
var apiKey = "87914ee1eadd9798d3e7ca94b91a62e8";

// information from weather form
var formSubmitHandler = function(event){
    event.preventDefault();
    var city = nameInputEl.value.trim();

    if (city) {
        getWeather(city);
        fiveDayWeather(city);
        cityNames.unshift({city});
        nameInputEl.value = "";
    } else {
        alert("Enter a City");
    };

    citySave();
    prevSearch(cityNames);
    
};

// save to local storage
var citySave = function() {
    localStorage.setItem("cityNames",JSON.stringify(cityNames));
};

//get weather from weather API
function getWeather(cityName){
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    var apiKey = "87914ee1eadd9798d3e7ca94b91a62e8";

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            showWeather(data, city);
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
    uvIndex(lon, lat);

};
    
//uv index

var uvIndex = function (lon,lat) {
    apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    apiKey = "87914ee1eadd9798d3e7ca94b91a62e8";

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data);
        });
    });
};

var displayUvIndex = function(index){

    var uvIndexEl = document.createElement("div");
        uvIndexEl.textContent = "UV Index: ";
    uvIndexEl.classList = "list-group-item";

    indexValue = document.createElement("span");
    indexValue.textContent = index.value;

    if(index.value <=2){
        indexValue.classList = "low"

    }else if(index.value >2 && index.value<=8){
        indexValue.classList = "moderate "

    }else if(index.value >8){
        indexValue.classList = "Very High"
    };

    uvIndexEl.appendChild(indexValue);
    weatherContainerEl.appendChild(uvIndexEl);

};

// 5 day weather
var fiveDayWeather = function (city){
    var apiKey = "87914ee1eadd9798d3e7ca94b91a62e8";
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            showFiveDay(data);
        });
    });
};

// display 5 day weather
var showFiveDay = function(weather){
    fiveDayContainerEl.textContent = "";
    forecastTitle.textContent = "5-day Forecast:";

    var forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        var dayForecast = forecast[i];

        var forecastEl = document.createElement("div")
        forecastEl. classList = " card bg-info text-light m-2";

        var forecastDate = document.createElement("h4");
            forecastDate.textContent = moment
            .unix(dayForecast.dt)
            .format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center";
        forecastEl.appendChild(forecastDate);
        
        var weatherIcons = document.createElement("img");
            weatherIcons.classList = "card-body text-center";
            weatherIcons.setAttribute(
                "src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
        forecastEl.appendChild(weatherIcons);

        var forecastTemp = document.createElement("span");
            forecastTemp.classList = "card-body text-center";
            forecastTemp.textContent = "Temperature: " + dayForecast.main.temp + " °F";
        forecastEl.appendChild(forecastTemp);

        var windForecastEL = document.createElement("span");
            windForecastEL.classList = "card-body text-center";
            windForecastEL.textContent = "Wind: " + dayForecast.wind.speed + " MPH";
        forecastEl.appendChild(windForecastEL);

        var humidforecastEl = document.createElement("span");
            humidforecastEl.classList = "card-body text-center";
            humidforecastEl.textContent = "Humidity: " + dayForecast.main.humidity + "  %";
        forecastEl.appendChild(humidforecastEl);

        fiveDayContainerEl.appendChild(forecastEl);
    };

};

// display previous cities weather
var prevSearch = function(prevSearch){

    prevSearchEl = document.createElement("button");
    prevSearchEl.textContent = prevSearch;
    prevSearchEl.classList = "d-flex w-100 btn-light border p-2";
    prevSearchEl.setAttribute("data-city", prevSearch);
    prevSearchEl.setAttribute("type", "submit");

    prevSearchBtn.prepend(prevSearchEl);
};

var prevSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getWeather(city);
        fiveDayWeather(city);
    };
};


cityFormEl.addEventListener("submit", formSubmitHandler);
prevSearchBtn.addEventListener("click", prevSearchHandler);