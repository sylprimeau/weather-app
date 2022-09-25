$(document).ready(function() {
      // retrieve user's location -- can't use HTML5 getCurrentLocation() because it's deprecated in Chrome unless it's from an "https" site which CodePen isn't. This API gives us the city as well and lat and long
      var city, country, weather, weatherId, tempC, tempF = "";
      var toggleC = true;


      $.getJSON("https://freegeoip.net/json/", function(json) {
        city = JSON.stringify(json.city).replace(/\"/g, "");
        country = JSON.stringify(json.country_name).replace(/\"/g, "");
				
//        latitude = JSON.stringify(json.latitude);
//        longitude = JSON.stringify(json.longitude);
//        $("#data").html("lat: " + latitude + "<br>lon: " + longitude);
				
				
// Chrome would not display the page without warnings because openweathermap uses HTTP instead of HTTPS so I needed to add "https://cors-anywhere.herokuapp.com" in front of the API endpoint URL
// Add your API key to the end of query like this: &appid=2a626cb9a1f5eb829fd5d1688cc218ef
        $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + city +  "&appid=2a626cb9a1f5eb829fd5d1688cc218ef", function(json) {
          weather = JSON.stringify(json.weather[0].description).replace(/\"/g, "");
          weatherId = JSON.stringify(json.weather[0].id).replace(/\"/g, "");
          tempC = Math.round(JSON.stringify(json.main.temp) - 273.15);
          tempF = Math.round((JSON.stringify(json.main.temp) * 9/5) - 459.67);
          $("#data").html("city, country: " + city + ", " + country + "<br>weather: " + weather + "<br>weather id: " + weatherId + "<br>temp C: " + tempC + "<br>temp F: " + tempF + "<br><br>All:<br><br>" + JSON.stringify(json));
          $("#city").html(city + ", " + country);
          $("#temp").html(tempC + "&deg;C");
          $("#weather").html(weather);
          if (weatherId < 300) {
            $("#icon").attr("src", "icons/thunderstorms01.png");
          } else if (weatherId < 500) {
            $("#icon").attr("src", "icons/flurries.png");
          } else if (weatherId < 511) {
            $("#icon").attr("src", "icons/rain02.png");
          } else if (weatherId < 512) {
            $("#icon").attr("src", "icons/freezingrain.png");
          } else if (weatherId < 532) {
            $("#icon").attr("src", "icons/rain02.png");
          } else if (weatherId < 611) {
            $("#icon").attr("src", "icons/snow.png");
          } else if (weatherId < 623) {
            $("#icon").attr("src", "icons/sleet.png");
          } else if (weatherId == 701) {
            $("#icon").attr("src", "icons/fog.png");
          } else if (weatherId == 741) {
            $("#icon").attr("src", "icons/fog.png");
          } else if (weatherId < 782) {
            $("#icon").attr("src", "icons/unknown.png");
          } else if (weatherId == 800) {
            $("#icon").attr("src", "icons/clear.png");
          } else if (weatherId == 801) {
            $("#icon").attr("src", "icons/mostlysunny.png");
          } else if (weatherId == 802) {
            $("#icon").attr("src", "icons/partlycloudy.png");
          } else if (weatherId == 803) {
            $("#icon").attr("src", "icons/cloudy.png");            
          } else if (weatherId == 804) {
            $("#icon").attr("src", "icons/scatteredclouds.png");            
          } else if (weatherId < 1000) {
            $("#icon").attr("src", "");            
          }

          if (tempC < 5) {
            $("#termo").attr("src", "icons/freezing.png");
          } else if (tempC > 25) {
            $("#thermo").attr("src", "icons/hot01.png");
          } else {
            $("#thermo").remove();
          }

          
          $("#temp").on("click", function() {
            if (toggleC == true) {
              toggleC = false;
              $("#temp").html(tempF + "&deg;F");
            } else if (toggleC == false) {
              toggleC = true;
              $("#temp").html(tempC + "&deg;C");
            }
          });

//          $("#icon").html("icon goes here");
          });
        });
});