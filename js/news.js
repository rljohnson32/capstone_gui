var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
           'apiKey=065d5f68a5744ac1bd764010f7fe8323';
var req = new Request(url);
var json;
var jsonN;
var categories = ["business","entertainment","general","health","science","sports","technology"];
var category = "none";
var curLimit = 3;
var lastTimeNewsUpdated;
var topThreeHeadlines = [];
var lowerIndex = 0;
var i = 0; 
var upperIndex = 4;

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
  updateNews(); //Get the initial news.
  setInterval(updateNews, 5*60000); //Update the news every 15 minutes.
});

function updateURL(){
  category = document.getElementById("drop").value;
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
  i = 0;
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

        	json = data;
          jsonN = json;
          $("#newsForm").html(formHtml);
          clearNewsList();

          var added = 0;
        // 	for (i = lowerIndex; added < curLimit; i++) { 
        //     var title = json.articles[i].title;
        //     var url = json.articles[i].url;
        //     var image = json.articles[i].urlToImage;
        //     if(!image){
        //       continue;
        //     }
        //     if(image.indexOf('http') == -1){
        //       continue;
        //     }
            
        //     if(topThreeHeadlines.length < 3){
        //       topThreeHeadlines.push(json.articles[i].title); 
        //     }

        //     added++;

        //     var html;

      		//   html = '<tr><td class="articleTitle">'+ title + '</td><td><a href=\'' + url + '\' target="_blank"><img class="img-thumbnail" src=\'' + image + '\'></a></td></tr>';

        //     $("#newslist").append(html);
  		    // }
          //var i = lowerIndex;
          while (added < curLimit) { 
            var title = json.articles[i].title;
            var url = json.articles[i].url;
            var image = json.articles[i].urlToImage;
            i++;
            if(i>= json.articles.length){
              i = 0;
            }
            if(!image){
              continue;
            }
            if(image.indexOf('http') == -1){
              continue;
            }
            
            if(topThreeHeadlines.length < 3){
              topThreeHeadlines.push(title); 
            }

            added++;

            var html;

            html = '<tr><td class="articleTitle">'+ title + '</td><td><a href=\'' + url + '\' target="_blank"><img class="img-thumbnail" src=\'' + image + '\'></a></td></tr>';

            $("#newslist").append(html);
          }
  		  
    
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
  //curLimit += 3; 
  updateNews();
}

function readNews(){
  for(var j = 0; j<topThreeHeadlines.length; i++){
    responsiveVoice.speak(topThreeHeadlines[j], "US English Female");
  }
}

function toggleNewsForm() {
    //var x = document.getElementById("stockForm");
    $("#newsForm").toggle('slow');
}

//lol this is hacky af
function clearNewsList(){
  topThreeHeadlines = [];
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
