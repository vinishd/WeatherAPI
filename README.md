A fun little program that uses the weather API from https://openweathermap.org/ and a Geocoding API from https://opencagedata.com/api to allow users to find the weather and other climate related facts for the current day of any city. Reverse geolocation is used to determine users' locations upon first click (with permissions of course) and load their current cities' data. Backgrounds are also loaded with a random image of the city the program reads. 
To run:
- you will need to register for accounts at https://openweathermap.org/ and https://opencagedata.com/api (don't worry it's super quick) to receive an API key for weather location data and geocoding data.
- copy the files to a local repository and download the VS Code Extension: Live Server, found here: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer. 
- in `script.js` replace the first line that says `your own API key` with your weather API key and the second line with your geocode API key.
- over index.html hit Ctrl + Shift + P on Windows or Cmd + Shift + P on MacOS
- type into the search bar `Live` and select `Live Server: Open with Live Server`
- you should be set! try out the program with as many cities as you like.
