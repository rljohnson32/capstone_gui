var refreshRate = 5;
var lat = 0;
var long = 0;
var curLocReq = 0;
var zip = 0;
var city = '';
var state = '';
var baseURLw = "http://api.wunderground.com/api/4a44ed522a5071aa/conditions/forecast10day/q/"
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
    else if(city+state != ''){
      query = state + '/' + city;
    }
    else{
      query = 90210;
    }
  }
  else{
    query = 'autoip';
  }
  URL = baseURLw + query + urlEnd;

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
          html += 'Zip Code:  </br><input type="number" id="zip">'
          html += '<input type="submit" onclick="getZip()" value="Update"></br>'
          html += 'City:  </br><input type="text" id="city"></br>'
          html += 'State:  </br><input type="text" id="state">'
          html += '<input type="submit" onclick="getCity()" value="Update"></br>'
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
        html += 'Zip Code: </br><input type="number" id="zip">'
        html += '<input type="submit" onclick="getZip()" value="Update"></br>'
        html += 'City:  </br><input type="text" id="city">'
        html += '<input type="submit" onclick="getCity()" value="Update"></br>'
        html += '<button onclick="getLocation()">Display Weather at Current Location</button>'
        $("#weather").html(html);
    });
}

function getLocation() {
    zip = 0;
    city = '';
    state = '';
    curLocReq = 1;
    updateWeather();
}

function getZip() {
  var uncheckedzip = $("#zip").val();
  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(uncheckedzip);
  if(isValidZip){
    zip = uncheckedzip;
    curLocReq = 0;
    city = '';
    state = '';
  }
  else{
    zip = 0;
  }
  console.log("Submitted zip: "+ zip);
  updateWeather();

}

function getCity() {
  
  //console.log($("#state").val()=='');
  if($("#state").val()!='' && $("#city").val()!=''){
    city = $("#city").val();
    state = $("#state").val();
    zip = 0;
    curLocReq = 0;
  }
  else{
    zip = 0;
  }
  console.log("Submitted Loc: "+ city + ', ' + state);
  updateWeather();

}

// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude;
// }

