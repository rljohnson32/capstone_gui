var url = 'https://newsapi.org/v2/top-headlines?sources=espn&apiKey=065d5f68a5744ac1bd764010f7fe8323';
var req = new Request(url);
var jsonSports;
var html;
var categories = ["business","entertainment","general","health","science","sports","technology"];
var sources = [""];

//can do country, catagory, country + category, or source

fetch(req)
		.then((resp) => resp.json())
     .then(function(data) {
	    if (data.status != 'ok') {
        	console.log('Error Pulling news data. Status Code: ' +
        	data.status);
        	return;
      	}
      	jsonSports = data;
      	html = '<h2>'+'Sports News'+'</h2>';
      	html += '<ul>';
      	for (i = 0; i < 5; i++) { 
    		  html += '<li>'+jsonSports.articles[i].title+'</li>';
    		  html += '<a href="'+ jsonSports.articles[i].url +'">Link To Article</a></br></br>';
		    }
		html += '</ul>';
      	
      	//html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      	//html += '<li class="currently">'+weather.currently+'</li>';
      	//html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';
  
      $("#sports").html(html);
      	//json = response.json();
        //console.log(json.status);
     })
     .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
