// get navigation links
//var allLinks = document.getElementsByTagName('a');
// get last word said element
var strongEl = document.getElementById('latest-word');
var weatherFlag = 0;

// new instance of speech recognition
var recognition = new webkitSpeechRecognition();
// set params
recognition.continuous = true;
//recognition.interimResults = true;
recognition.maxAlternatives = 1;
recognition.start();

recognition.onresult = function(event){
  
  // delve into words detected results & get the latest
  // total results detected
  var resultsLength = event.results.length -1 ;
  // get length of latest results
  var ArrayLength = event.results[resultsLength].length -1;
  // get last word detected
  var saidWord = event.results[resultsLength][ArrayLength].transcript;
  //var prevWord = event.results[resultsLength][ArrayLength-1].transcript;

  if (saidWord.indexOf('weather') !== -1){
    if(saidWord.indexOf('local') !== -1){
      getLocation();
    }
    //weatherFlag = 1;  
    sayCurrentWeather();  
  }
  else if(saidWord.indexOf('quote') !== -1){
    if(saidWord.indexOf('new') !== -1){
      updateQuote();
    }
    sayQuote();
    //quoteFlag = 1;
  }
  else if(saidWord.indexOf('time') !== -1){
    sayCurrentTime();
    //timeFlag = 1;
  } 

  else if(saidWord.indexOf('set') !== -1){
    //if(saidWord.indexOf('it') !== -1){
      setTimer();
    //}
  } 

  else if(saidWord.indexOf('stock') !== -1){
    if(saidWord.indexOf('add') !== -1){
      console.log(saidWord + 'index of add is: ' + saidWord.indexOf('add'));
      console.log( "this should be GE: " + saidWord[4] );
      alert("stock and add detected");
      var symbol = saidWord[4] + saidWord[5];
      alert(symbol);
      $("#newstock").val(symbol);// = symbol;
      addSymbol();
    }
    else{
     sayStocks(); 
    }
    
    //stockFlag = 1;
  }   
  
  //processFlags();

  
  // loop through links and match to word spoken
  // for (i=0; i<allLinks.length; i++) {
    
  //   // get the word associated with the link
  //   var dataWord = allLinks[i].dataset.word;
    
  //   // if word matches chenge the colour of the link
  //   if (saidWord.indexOf(dataWord) != -1) {
  //     allLinks[i].style.color = 'red';
  //   }
  // }
  
  // append the last word to the bottom sentence
  //strongEl.innerHTML = saidWord;
}

function processFlags(){
  if(weatherFlag){
    weatherFlag = 0;
    sayCurrentWeather();
    //recognition.start();
  }
}

// speech error handling
recognition.onerror = function(event){
  console.log('error?');
  console.log(event);
}