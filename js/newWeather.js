var refreshRate = 5;
var lat = 0;
var long = 0;
var curLocReq = 0;
var zip = 0;
var baseURL = "http://api.wunderground.com/api/4a44ed522a5071aa/conditions/forecast10day/q/"
var query;
var URL;
var madisonURL = "http://api.wunderground.com/api/4a44ed522a5071aa/conditions/forecast10day/q/WI/Madison.json"
var testURL = "http://api.wunderground.com/api/4a44ed522a5071aa/conditions/forecast10day/q/autoip.json"
var urlEnd = ".json"
var jsonw;

$(document).ready(function($) {
  updateWeather();
  setInterval(updateWeather, refreshRate*60000); //Update the weather every 5 minutes.
});

function updateWeather(){
  if(curLocReq == 0){
    if(zip != 0){
      query = zip;
    }
    else{
      query = 53029;
    }
  }
  else{
    query = 'autoip';
  }
  URL = baseURL + query + urlEnd;

  var req = new Request(URL);
  fetch(req)
      .then((resp) => resp.json())
       .then(function(data) {

          var html;
          jsonw = data;
          var location = data.current_observation.display_location.full;
          var temp_f = data.current_observation.temp_f.toString().substring(0,2) + '&deg;'+' F';
          var feelsLike = data.current_observation.feelslike_string.substring(0,2) + '&deg;'+' F';
          var desc = data.current_observation.icon;
          var weatherDescription = desc.charAt(0).toUpperCase() + desc.slice(1);
          var icon = data.current_observation.icon_url;
          var forecast = data.forecast.simpleforecast.forecastday;
          //alert("Current temperature in " + location + " is: " + temp_f);
          html = '<h2>'+location+'</h2>';


          html += '<ul>';
          html += '<li class="currently">'+weatherDescription+' <img src=' + icon +'></li>';
          html += '<li>Current Temp: '+temp_f+'</li>';
          html += '<li>Feels Like: '+feelsLike+'</li></ul>';
          //html += '<img src=' + icon +'></br>';
          html += 'Zip Code: <input type="number" id="zip">'
          html += '<input type="submit" onclick="getZip()" value="Update"></br>'
          html += '<button onclick="getLocation()" >Display Weather at Current Location</button>'

          html += '<h2>5 Day Forecast</h2>';
          html += '<ul>';
          
          for (i = 1; i < 6; i++) { 
            html += '<li><b>'+forecast[i].date.weekday_short+ ':<img src=' + forecast[i].icon_url +'></b></li>';
            //html += '<img src=' + forecast[i].icon_url +'></br>';
            html += forecast[i].conditions+'</br>';
            html += 'High Temp: ' + forecast[i].high.fahrenheit + '&deg;'+' F';;
          }
          html += '</ul>';
          html += '<p>Weather updated every ' + refreshRate+ ' minutes</p>';
       $("#weather").html(html);
       })
       .catch(function(err) {
        console.log('ERROR FETCHING WEATHER DATA:', err);
        html = '<p>Error Fetching Weather Data</p>';
        html += 'Location: <input type="number" id="zip">'
        html += '<input type="submit" onclick="getZip()" value="Update"></br>'
        html += '<button onclick="getLocation()">Display Weather at Current Location</button>'
        $("#weather").html(html);
    });
}





// function getWeather() {
//   var loc;
//   if(lat == 0 || long == 0){
//     if(zip != 0){
//       loc = zip;
//     }
//     else{
//       loc = 53029;
//     }
//   }
//   else{
//     loc = lat+","+long;
//   }
//   $.simpleWeather({
//     location: loc,
//     unit: 'f',
//     success: function(weather) {
//       console.log(weather);
//       html = '<h2>'+weather.city+', '+weather.region+'</h2>';
//       html += 'Location: <input type="text" id="zip">'
//       html += '<input type="submit" onclick="getZip()" value="Update"></br>'
//      // html += '<button onclick="getZip()">Update</button></br>'
//       html += '<button onclick="getLocation()" >Display Weather at Current Location</button>'


//       //html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
//       //html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
//       html += '<ul>';
//       html += '<li class="currently">'+weather.currently+'</li>';
//       html += '<li>Current Temp: '+weather.temp+'&deg;'+weather.units.temp+'</li>';
//       html += '<li>Wind Chill: '+weather.wind.chill+'&deg;'+weather.units.temp+'</li></ul>';

//       //var timestamp = moment(weather.updated);
//       //html += '<p>Weather updated at '+moment(timestamp).format('h:mma')+'</p>';

//       html += '<img src=' + weather.image +'></br>';
//       html += '<h2>5 Day Forecast</h2>';
//       html += '<ul>';
//         for (i = 1; i < 6; i++) { 
//           html += '<li>'+weather.forecast[i].day+ ': </li>';
//           html += weather.forecast[i].text+'</br>';
//           html += 'High Temp: ' + weather.forecast[i].high;
//         }
//       html += '</ul>';
//       html += '<p>Weather updated every ' + refreshRate+ ' minutes</p>';
//       // for(var i=0;i<weather.forecast.length;i++) {
//       //   html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
//       // }
      

//       $("#weather").html(html);
//     },
//     error: function(error) {
//       html = '<p>'+error+'</p>';
//       html += '<button onclick="getLocation()">Display Weather at Current Location</button>'
//       $("#weather").html(html);
//     }
//   });
// }
// getWeather();

function getLocation() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //   lat = position.coords.latitude;
    //   long = position.coords.longitude; //load weather using your lat/lng coordinates
    //   zip = 0
    //   console.log("lat: " + lat);
    //   console.log("long: " + long);
    //   updateWeather();
    // });
    // } else { 
    //     console.log("Geolocation is not supported by this browser.");
    // }
    zip = 0;
    curLocReq = 1;
    updateWeather();
}

function getZip() {
  var uncheckedzip = $("#zip").val();
  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(uncheckedzip);
  if(isValidZip){
    zip = uncheckedzip;
    curLocReq = 0;
  }
  else{
    zip = 0;
  }
  console.log("Submitted zip: "+ zip);
  updateWeather();

}

// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude;
// }

