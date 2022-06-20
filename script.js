let weather = {
    "apiKey": "*YOUR OWN API KEY*",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=imperial&appid=" +
                this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { temp_min } = data.main;
        const { temp_max } = data.main;
        const { pressure } = data.main;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "m/h";
        document.querySelector(".mintemp").innerText = "Low for today: " + temp_min + "°F";
        document.querySelector(".maxtemp").innerText = "High for today: " + temp_max + "°F";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/2000x1000/?city/" + name + "')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};


let geocode = {
    reverseGeoCode: function(latitude, longitude) {
        var api_key = '*YOUR OWN API KEY*';
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
                weather.fetchWeather(data.results[0].components.city);

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
            weather.fetchWeather("San Francisco");
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
