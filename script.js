let weather = {
    "apiKey": "WEATHER API KEY",
    fetchWeather: function(city, state, country) {
        if(city.indexOf(' ') >= 0){
            city = city.split(" ").join("%20");
        }
        fetch(
                "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "," + state + "," + country + "&cnt=1&appid=" + this.apiKey + "&units=imperial"
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "," + country + "&appid=" + this.apiKey + "&units=imperial"
        )
        .then((response) => response.json())
        .then((data1) => this.displayWeather1(data1));
    },
    displayWeather: function(data) {
        const { name } = data.city;
        // const { icon, description } = data.list[0].weather;
        // const { temp, humidity } = data.main;
        // const { speed } = data.list;
        const { min } = data.list[0].temp;
        const { max } = data.list[0].temp;
        // const { pressure } = data.main;
        // const { country } = data.sys;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".mintemp").innerText = "Low for today: " + min + "°F";
        document.querySelector(".maxtemp").innerText = "High for today: " + max + "°F";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/2000x1000/?city/" + name + "')"
    },
    displayWeather1: function(data1){
        const { temp, humidity } = data1.main;
        const { icon, description } = data1.weather[0];
        const { speed } = data1.wind;
        document.querySelector(".temperature").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};


let geocode = {
    reverseGeoCode: function(latitude, longitude) {
        var api_key = 'GEOLOCATION API KEY';
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var request_url = api_url +
            '?' +
            'key=' + api_key +
            '&q=' + encodeURIComponent(latitude + ',' + longitude) +
            '&pretty=1' +
            '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);

        request.onload = function() {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if (request.status === 200) {
                // Success!
                var data = JSON.parse(request.responseText);
                weather.fetchWeather(data.results[0].components.city, data.results[0].components.state_code, data.results[0].components.country_code);

            } else if (request.status <= 500) {
                // We reached our target server, but it returned an error

                console.log("unable to geocode! Response code: " + request.status);
                var data = JSON.parse(request.responseText);
                console.log('error msg: ' + data.status.message);
            } else {
                console.log("server error");
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("unable to connect to server");
        };

        request.send(); // make the request

    },
    getLocation: function() {
        function success(data) {
            geocode.reverseGeoCode(data.coords.latitude, data.coords.longitude);
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, console.error);
        } else {
            weather.fetchWeather("San Francisco, CA, US");
        }
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

geocode.getLocation();

// weather.fetchWeather("San Francisco");
