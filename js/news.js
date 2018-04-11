var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
           'apiKey=065d5f68a5744ac1bd764010f7fe8323';
var req = new Request(url);
var json;
var jsonN;
var categories = ["business","entertainment","general","health","science","sports","technology"];
var category = "none";
var curLimit = 5;

var formHtml =  '<h4>'+'Select A Category'+'</h4>'+
                '<select id=\'drop\' oninput="updateURL()">\
                      <option value="none"> All<br>\
                      <option value="business"> Business<br>\
                      <option value="entertainment"> Entertainment<br>\
                      <option value="general"> General<br>\
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
        	var html = '<h2>'+'Top Stories'+'</h2>';
          html += formHtml;
        	html += '<ul>';
        	for (i = 0; i < curLimit; i++) { 
      		  html += '<li>'+json.articles[i].title+'<a href="'+ json.articles[i].url +'" target="_blank"><img class="img-thumbnail" src=' + json.articles[i].urlToImage +'></a></br></br></li>';
      		  // html += '<a href="'+ json.articles[i].url +'" target="_blank">Link To Article</a></br></br>';
          //Ideas:
          //
  		    }
  		    html += '</ul>';
          html += '<button id="showMoreButton" onclick="showMore()" >Show More</button>'
    
        $("#news").html(html);
        category = document.getElementById("drop").value = category;
        	//json = response.json();
          //console.log(json.status);
       })
       .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function showMore(){
  curLimit += 5; 
  updateNews();
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
