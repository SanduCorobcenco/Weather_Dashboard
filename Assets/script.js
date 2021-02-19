
// Assign variable searchButton to btn form
var searchButton = $(".btn")

// Generated API key
var apiKey = "6d34cd211ae31303402ede01afd13c60";

// Function that will search the value of city on click
searchButton.click(function() {
var cityInput = $("#search-value").val();
var urlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial";

var clickCount = 0;
if (cityInput == "") {
    console.log("no city name");
    }
else {

// API call for today's weather
$.ajax({
    url: urlToday,
    method: 'GET'
}).then(function (response) { 

// Prepend city name on the search list
var cityName = $(".recent-searches").addClass("recent-searches-item")
cityName.prepend("<li>" + response.name + "</li>");

console.log(response);

var storage = localStorage.setItem(clickCount, response.name);
clickCount = clickCount + 1;


for (var j = 0; j < 1; j++) {
    var city = localStorage.getItem(j);
    var cityName = $(".history").addClass("recent-searches-item");

    cityName.prepend("<li> " + city + "</li>");
} 


// Adding class to card-body
var todayWeather = $("#today").append("<div>").addClass("card-body");

// Empty cards after each search
todayWeather.empty();
var currentCity = todayWeather.append("<p>");
todayWeather.append(currentCity);

// Getting Time Date
var data = new Date(response.dt * 1000).toLocaleDateString("en-us");  
console.log(data);

// Append data to card
currentCity.append("<h1>" + response.name + " " + "(" + data + ")" + "</h1>");
currentCity.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
var temp = currentCity.append("<p>");
currentCity.append(temp);
temp.append("<p>" + "Temperature: " + response.main.temp + " °F </p>")
temp.append("<p>" + "Humidity: " + response.main.humidity + " % </p>")
temp.append("<p>" + "Wind Speed: " + response.wind.speed + " MPH </p>")


var urlUVIndex = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&appid=' + apiKey;


// API call for UV index and next 5 days weather
$.ajax({
    url: urlUVIndex,
    method: "GET"
    }).then(function (response) {
        var currentCity = temp.append("<p>" + "UV INDEX: " + response.current.uvi + "</p>" ).addClass("card-text");
        currentCity.addClass("UV");
        temp.append(currentCity);
        console.log(response);
        var daysForecast = "<h1> Five days Forecast: </h1>";
       
        $("#weather").empty();
        $("#weather").append(daysForecast);

        for (var i = 1; i < 6; i ++ ) {
        
        console.log(response.daily[i].dt);

        var dataTime = new Date(response.daily[i].dt * 1000).toLocaleDateString("en-us");

        //column with title, img, temp, humidity
        var column = $('<article class="card-body" id="card_body">');

        var cardT = $('<h5 class="forecast-date">').text(dataTime);

        var newImg = $('<img class="weatherIcon">').attr("src",  "https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png"); 
        var tempRound = response.daily[i].temp.day;
        var humidityProcent = response.daily[i].humidity;
        var temp2 = $('<p class="txt">').text("Temperature: " + tempRound.toFixed() + " °F");
        var humidity2 = $('<p class="txt">').text("Humidity: " + humidityProcent + " %")


        //appends info together
        column.append(cardT, newImg, temp2, humidity2);

        //appends to html row
        $("#weather").append(column);
        
        } 
    });
});
}
})
