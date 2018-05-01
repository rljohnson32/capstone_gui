var refreshRate = 5;
var lat = 0;
var long = 0;
var curLocReq = 0;
var zip = 0;
var city = '';
var state = '';
var baseURLw = "https://api.wunderground.com/api/4a44ed522a5071aa/conditions/hourly/forecast10day/q/"
var query;
var URL;
var madisonURL = "https://api.wunderground.com/api/4a44ed522a5071aa/conditions/forecast10day/q/WI/Madison.json"
var testURL = "https://api.wunderground.com/api/4a44ed522a5071aa/conditions/forecast10day/q/autoip.json"
var urlEnd = ".json"
var jsonw;
var lastTimeWeatherUpdated;
var curTemp;
var curCond;
var curCity;
var rainPercent;
// var weatherDescription;
// var location;
// var temp_f;

$(document).ready(function($) {
  updateLastUpdate();
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
      query = 53706;
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
          curCity = data.current_observation.display_location.city;
          var temp_f = data.current_observation.temp_f.toString().substring(0,2) + '&deg;'+' F';
          curTemp = data.current_observation.temp_f.toString().substring(0,2);
          // var feelsLike = data.current_observation.feelslike_string.substring(0,2) + '&deg;'+' F';
          //var desc = data.current_observation.icon;
          //var weatherDescription = desc.charAt(0).toUpperCase() + desc.slice(1);
          var weatherDescription = data.current_observation.weather;
          curCond = weatherDescription;
          var icon = data.current_observation.icon_url;
          //<img src="http://icons.wxug.com/i/c/k/partlycloudy.gif">
          var forecast = data.forecast.simpleforecast.forecastday;
          var hourlyforecast = data.hourly_forecast;
          var rainChance = forecast[0].pop + '%';
          rainPercent = rainChance;

          $("#weatherLocation").html(location);
          $("#curWeatherSymbol").html('<img src="' + icon + '">');
          $("#curTempF").html(temp_f);

          $("#now").html('Now');
          $("#nowR").html(rainChance);
          $("#nowS").html('<img src="' + icon + '">');
          $("#nowT").html(curTemp);

          var hour;
          var ap;
          var pop;
          var symbol;
          var hourlytemp;

          for(i = 0; i < 5; i++){
            hour = hourlyforecast[i].FCTTIME.hour;
            ap = "AM";
            if (hour   > 11) { ap = "PM";             }
            if (hour   > 12) { hour = hour - 12;      }
            if (hour   == 0) { hour = 12;             }
            
            hour = hour + ap;
            pop = hourlyforecast[i].pop + '%';
            symbol = hourlyforecast[i].icon_url;
            hourlytemp = hourlyforecast[i].temp.english;
            $("#" + (i+1) + 'hr').html(hour);
            $("#" + (i+1) + 'hrR').html(pop);
            $("#" + (i+1) + 'hrS').html('<img src="' + symbol + '">');
            $("#" + (i+1) + 'hrT').html(hourlytemp);
          }

          var day;
          var daySymbol;
          var daypop;
          var dayHigh;
          var dayLow; //need to put 2 spaces on the front of this string, see line 200 in gui.html

          // var i = 0; 
          // var rightnow    = new Date();
          // var hournow   = rightnow.getHours();
          // if(hournow > 12){
          //   i = 1;
          // }
          for(i = 1; i < 6; i++){
            day = forecast[i].date.weekday_short;
            daySymbol = forecast[i].icon_url;
            daypop = forecast[i].pop + '%';
            dayHigh = forecast[i].high.fahrenheit;
            dayLow = '&nbsp&nbsp&nbsp' + forecast[i].low.fahrenheit + '&nbsp&nbsp&nbsp';
            $("#day" + (i)).html(day);
            $("#day" + (i) + 'S').html('<img src="' + daySymbol + '">');
            $("#day" + (i) + 'R').html(daypop);
            $("#day" + (i) + 'H').html(dayHigh);
            $("#day" + (i) + 'L').html(dayLow);
          }

          // //alert("Current temperature in " + location + " is: " + temp_f);
          // html = '<h2>'+location+'</h2>';

          // html += '<div id="currentWeatherList">';
          // html += '<ul>';
          // html += '<li class="currently">'+weatherDescription+' <img src=' + icon +'></li>';
          // html += '<li>Current Temp: '+temp_f+'</li>';
          // html += '<li>Feels Like: '+feelsLike+'</li>';
          // html += '<li>Chance of Rain: '+rainChance+'%</li></ul>';
          // html += '</div>';
          // // html += '<input id="speak" type="submit" onclick="sayCurrentWeather()" value="Speak Weather"></br>';

          // html += '<i style="font-size:15px;color:grey">Updated: <span id="lastWeatherUpdate">'+ lastTimeWeatherUpdated +'</span></i></br></br>';
          // //html += '<img src=' + icon +'></br>';

          // html += '<div id="weatherForm" style="display: none;">';
          // html += 'Zip Code:  </br><input id="zip" size="6" maxlength="5">';
          // html += '<input type="submit" onclick="getZip()" value="Update"></br>';
          // html += 'City:  </br><input type="text" id="city" size="14"></br>';
          // html += 'State:  </br><input type="text" id="state" size="14">';
          // html += '<input type="submit" onclick="getCity()" value="Update"></br>';
          // html += '<button onclick="getLocation()" >Current Location</button>';
          // html += '</div>'
          // html += '<input id="toggler" type="submit" onclick="toggleForm()" value="Change"></br>';

          // html += '<h2>5 Day Forecast</h2>';
          // html += '<ul>';
          
          // for (i = 1; i < 6; i++) { 
          //   html += '<li><b>'+forecast[i].date.weekday_short+ ':<img src=' + forecast[i].icon_url +'></b></li>';
          //   html += forecast[i].conditions+'</br>';
          //   html += 'High Temp: ' + forecast[i].high.fahrenheit + '&deg;'+' F</br>';
          //   html += 'Chance of Rain: '+forecast[i].pop+'%</br>';
          // }
          // html += '</ul>';
          // html += '<p>Weather updated every ' + refreshRate+ ' minutes</p>';

       // $("#weather").html(html);
       })
       .catch(function(err) {
        // console.log('ERROR FETCHING WEATHER DATA:', err);
        // html = '<p>Error Fetching Weather Data</p>';
        // html += 'Zip Code:  </br><input id="zip" size="6" maxlength="5">'
        // html += '<input type="submit" onclick="getZip()" value="Update"></br>'
        // html += 'City:  </br><input type="text" id="city" size="14"></br>'
        // html += 'State:  </br><input type="text" id="state" size="14">'
        // html += '<input type="submit" onclick="getCity()" value="Update"></br>'
        // html += '<button onclick="getLocation()" >Current Location</button>'
        // $("#weather").html(html);
    });
  updateLastUpdate();
}

function toggleWeatherForm(){
  var x = document.getElementById("weatherForm");
  if (x.style.display === "none") {
      x.style.display = "block";
      // document.getElementById("newstock").focus();
  } else {
      x.style.display = "none";
  }
}

function toggleForecast(){
  var f1 = document.getElementById("forcastDay1");
  if (f1.style.display === "none") {
      $("#toggleForecastButton").html('Hide Forecast');
      // document.getElementById("newstock").focus();
  } else {
      $("#toggleForecastButton").html('Show Forecast');
  }
  $("#forcastDay1").toggle('slow');
  $("#forcastDay2").toggle('slow');
  $("#forcastDay3").toggle('slow');
  $("#forcastDay4").toggle('slow');
  $("#forcastDay5").toggle('slow');

}

function sayCurrentWeather(){
  //console.log("IN CURRENT WEATHER FUNCTION");
  //updateWeather();
  if(!responsiveVoice.isPlaying()) {
    var curWeatherString = "It is currently " + curTemp + " degrees and " + curCond + " in " + curCity + ".";//" There is a " + rainPercent + " chance of rain today";
    responsiveVoice.speak(curWeatherString, "US English Female");
  }

}

function sayRainChance(){
  var rainString = "There is currently a " + rainPercent + " chance of rain in " + curCity + ".";
  responsiveVoice.speak(rainString, "US English Female");
}

function updateLastUpdate(){

  var d = new Date();
  var hour   = d.getHours();
  var minute = d.getMinutes();
  var ap = "AM";
  if (hour   > 11) { ap = "PM";             }
  if (hour   > 12) { hour = hour - 12;      }
  if (hour   == 0) { hour = 12;             }
  if (minute < 10) { minute = "0" + minute; }
  lastTimeWeatherUpdated = hour + ':' + minute + ' ' + ap;
  $('#lastWeatherUpdate').html(lastTimeWeatherUpdated);
  //$('#lastWeatherUpdate').html(hour + ':' + minute + ' ' + ap);
  //alert('updated with' + hour + ':' + minute + ' ' + ap);
  //alert($('#lastWeatherUpdate').html());
}

function toggleForm(){
  $('#weatherForm').toggle();
  if ( $('#weatherForm').css('display') == 'none' ){
     $('#toggler').val("Change");
  }
  else{
    $('#toggler').val("Hide Form");
  }
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

