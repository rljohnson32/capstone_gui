var refreshRate = 5;
var lat = 0;
var long = 0;
var zip = 0;

$(document).ready(function() {  
  getWeather(); //Get the initial weather.
  setInterval(getWeather, refreshRate*60000); //Update the weather every 5 minutes.
});

function getWeather() {
  var loc;
  if(lat == 0 || long == 0){
    if(zip != 0){
      loc = zip;
    }
    else{
      loc = 53029;
    }
  }
  else{
    loc = lat+","+long;
  }
  $.simpleWeather({
    location: loc,
    unit: 'f',
    success: function(weather) {
      console.log(weather);
      html = '<h2>'+weather.city+', '+weather.region+'</h2>';
      html += 'Location: <input type="text" id="zip">'
      html += '<input type="submit" onclick="getZip()" value="Update"></br>'
     // html += '<button onclick="getZip()">Update</button></br>'
      html += '<button onclick="getLocation()" >Display Weather at Current Location</button>'


      //html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      //html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<ul>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>Current Temp: '+weather.temp+'&deg;'+weather.units.temp+'</li>';
      html += '<li>Wind Chill: '+weather.wind.chill+'&deg;'+weather.units.temp+'</li></ul>';

      //var timestamp = moment(weather.updated);
      //html += '<p>Weather updated at '+moment(timestamp).format('h:mma')+'</p>';

      html += '<img src=' + weather.image +'></br>';
      html += '<h2>5 Day Forecast</h2>';
      html += '<ul>';
        for (i = 1; i < 6; i++) { 
          html += '<li>'+weather.forecast[i].day+ ': </li>';
          html += weather.forecast[i].text+'</br>';
          html += 'High Temp: ' + weather.forecast[i].high;
        }
      html += '</ul>';
      html += '<p>Weather updated every ' + refreshRate+ ' minutes</p>';
      // for(var i=0;i<weather.forecast.length;i++) {
      //   html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
      // }
      

      $("#weather").html(html);
    },
    error: function(error) {
      html = '<p>'+error+'</p>';
      html += '<button onclick="getLocation()">Display Weather at Current Location</button>'
      $("#weather").html(html);
    }
  });
}
getWeather();

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude; //load weather using your lat/lng coordinates
      zip = 0
      console.log("lat: " + lat);
      console.log("long: " + long);
      getWeather();
    });
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function getZip() {
  zip = $("#zip").val();
  lat = 0;
  long = 0;
  console.log("Submitted zip: "+ zip);
  getWeather();

}

// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude;
// }

