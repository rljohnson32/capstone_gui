var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
           'apiKey=065d5f68a5744ac1bd764010f7fe8323';
var req = new Request(url);
var json;
var jsonN;
var categories = ["business","entertainment","general","health","science","sports","technology"];
var category = "none";
var curLimit = 5;
var lastTimeNewsUpdated;
var topThreeHeadlines = [];

var formHtml =  '<h4>'+'Select A Category'+'</h4>'+
                '<select id=\'drop\' oninput="updateURL()">\
                      <option value="none"> All<br>\
                      <option value="business"> Business<br>\
                      <option value="entertainment"> Entertainment<br>\
                      <option value="health"> Health<br>\
                      <option value="science"> Science<br>\
                      <option value="sports"> Sports<br>\
                      <option value="technology"> Technology\
                </select></br>'
                // '<input type="submit" onclick="updateURL()" value="Update"></br>'

$(document).ready(function() {  
  updateNews(); //Get the initial weather.
  setInterval(updateNews, 15*60000); //Update the news every 15 minutes.
});

function updateURL(){
  category = document.getElementById("drop").value;
  curLimit = 5;
  if(category == "none"){
    url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
           'apiKey=065d5f68a5744ac1bd764010f7fe8323';
  }
  else{
  url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'category=' + category + '&' +
          'apiKey=065d5f68a5744ac1bd764010f7fe8323';
  }
  updateNews();
}

//var html;
function updateNews(){
  var req = new Request(url);
  fetch(req)
  		.then((resp) => resp.json())
       .then(function(data) {
  	    if (data.status != 'ok') {
          	console.log('Error Pulling news data. Status Code: ' +
          	data.status);
          	return;
        	}
          //if(catSelected){

        	json = data;
          jsonN = json;
          // var headline1 = json.articles[0].title;
          // var headline2 = json.articles[1].title;
          // var headline3 = json.articles[2].title;
          // topThreeHeadlines.push(headline1);
          // topThreeHeadlines.push(headline2);
          // topThreeHeadlines.push(headline3);
        	//var html = '<h2>'+'Top Stories'+'</h2>';
          $("#newsForm").html(formHtml);
          clearNewsList();

        	//html += '<ul>';
        	for (i = 0; i < curLimit; i++) { 
            var title = json.articles[i].title;
            var url = json.articles[i].url;
            var image = json.articles[i].urlToImage;
            if(image.indexOf('http') == -1){
              continue;
            }
            topThreeHeadlines.push(json.articles[i].title);
            var html;

      		  html = '<tr><td class="articleTitle">'+ title + '</td><td><a href=\'' + url + '\' target="_blank"><img class="img-thumbnail" src=\'' + image + '\'></a></td></tr>';
      		  // html += '<a href="'+ json.articles[i].url +'" target="_blank">Link To Article</a></br></br>';
          //Ideas:
          //
          $("#newslist").append(html);
  		    }
  		    //html += '</ul>';
          //html += '<button id="showMoreButton" onclick="showMore()" >Show More</button>'
    
        category = document.getElementById("drop").value = category;
        updateLastUpdateNews();
        	//json = response.json();
          //console.log(json.status);
       })
       .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function updateLastUpdateNews(){

  var d = new Date();
  var hour   = d.getHours();
  var minute = d.getMinutes();
  var ap = "AM";
  if (hour   > 11) { ap = "PM";             }
  if (hour   > 12) { hour = hour - 12;      }
  if (hour   == 0) { hour = 12;             }
  if (minute < 10) { minute = "0" + minute; }
  lastTimeNewsUpdated = hour + ':' + minute + ' ' + ap;
  $('#lastNewsUpdate').html(lastTimeNewsUpdated);
  //$('#lastWeatherUpdate').html(hour + ':' + minute + ' ' + ap);
  //alert('updated with' + hour + ':' + minute + ' ' + ap);
  //alert($('#lastWeatherUpdate').html());
}

function showMore(){
  curLimit += 5; 
  updateNews();
}

function readNews(){
  for(var i = 0; i<topThreeHeadlines.length; i++){
    responsiveVoice.speak(topThreeHeadlines[i], "US English Female");
  }
}

function toggleNewsForm() {
    //var x = document.getElementById("stockForm");
    $("#newsForm").toggle('slow');
}

//lol this is hacky af
function clearNewsList(){
  var html = '<table id="newslist"><tr><th colspan="2" id="newsHeader"><span class="fa fa-newspaper-o" aria-hidden="true" onclick="toggleNewsForm()"></span>&nbsp&nbspNews<span onclick="updateNews()" id="newsRefresh" class="fa fa-refresh" aria-hidden="true"></span><span id="lastNewsUpdate" style="color:grey; float:right"></span></th></tr></table>        <span id="loadMoreNews" onclick="showMore()" style="color:grey; float:left; padding-bottom:20px">More</span>';
  $("#news").html(html);
}

/*
Ideas:
Include the photo, click to expand and show description
Show list of all available news options allow user to pick what they want to see.
Allow user to pick and save their favorites
Allow user to log in to save / cache info

Weather : mimic the apple sidebar / weather app. 
input to expand

think about how things can be controlled by voice
*/
