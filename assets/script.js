let apiKey = "352dec22bccf171068e86eed834c56f1";
let storedCities = $("#stored-cities");
let cities = JSON.parse(localStorage.getItem("City")) || []; //ensure 
let outputCities = [];
const searchButton = $("#search-button");

let cityInput = $("#city-input");



//Only allow unique values in the array
function removewithfilter(arr) {
    let outputCities = arr.filter(function (v, i, self) {

        // It returns the index of the first
        // instance of each value
        return i == self.indexOf(v);
    });

    return outputCities;
}

console.log(removewithfilter(cities));



//button that will pull up the current cities weather information, 5 day tracker, and the past cities searched
searchButton.on('click', function (event) {
    event.preventDefault();


    // let cityInput = $("#city-input").val();

    console.log(cityInput.val());
    getCitiesLonLat(cityInput.val());

    $("#weather-today").empty().append;
    $("#cards").empty().append;
});


//function to save the cities into the local storage
function saveCities() {
    localStorage.setItem("City", JSON.stringify(cities));
}

function displayPastCities() {
    console.log(cities);
    const uniqueCities = removewithfilter(cities)
    
    $("#stored-cities").empty();

    for (var i = 0; i < Math.min(5,uniqueCities.length); i++) {
        let pastCity = $("<button>").text(uniqueCities[i]);
        pastCity.addClass("past-cities");
        $("#stored-cities").append(pastCity);

        pastCity.on('click', function (event){
            event.preventDefault();
            
            /* Currently the buttons are pulling a random location. Need to pull in correct data
            
            getCitiesLonLat(pastCity.val(i));
            
            $("#weather-today").empty().append;
            $("#cards").empty().append;
            
            */

    })
        
    

    }
}


const date = new Date();

for (var i = 0; i < 5; i++) {
    let day = date.getDate()
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let todayDate = `${month}/${day + i}/${year}`;
    console.log(todayDate);
}



function getCitiesLonLat(cityName) {
    const URLTest = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
    fetch(URLTest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cities.push(data[0].name);
            saveCities();
            displayPastCities();
            cityInput.val("");
            currentWeatherAPI(data[0].lat, data[0].lon)
        })
}



function currentWeatherAPI(latitude, longitude) {

    const URL = "https:api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            console.log(data.main.temp);


            let cityTitle = $("<h4>").text(data.name);
            $("#weather-today").append(cityTitle);
            let cityTemp = $("<p>").text(data.main.temp + " \u00b0F");
            $("#weather-today").append(cityTemp);
            let cityWind = $("<p>").text(data.wind.speed + " MPH");
            $("#weather-today").append(cityWind);
            let cityHumid = $("<p>").text(data.main.humidity + "%");
            $("#weather-today").append(cityHumid);

            //clear past data use .empty().append
        })

    const URL2 = "https:api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
    fetch(URL2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < 5; i++) {

                let cardDiv = $("<div>");
                cardDiv.addClass("card-box");

                /* working on conditioning the image in
                let imgWeather =$("<p>");
                let imgCondition = data.list[i].weather.main
                if (imgCondition ==="Clear"){
                    p.text("☀️")
                    imgCondition.append
                }
                */

                let todayDateCard = $("<h3>").text.todayDate;
                cardDiv.append(todayDateCard);

                let cardTemp = $("<h6>").text(data.list[i].main.temp + " \u00b0F");
                cardDiv.append(cardTemp);
                let cardWind = $("<h6>").text(data.list[i].wind.speed + " MPH");
                cardDiv.append(cardWind);
                let cardHumid = $("<h6>").text(data.list[i].main.humidity + " %");
                cardDiv.append(cardHumid);
                $("#cards").append(cardDiv);
            }

        })
}



