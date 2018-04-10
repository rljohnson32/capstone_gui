// get navigation links
//var allLinks = document.getElementsByTagName('a');
// get last word said element
var weatherFlag = 0;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.start();

setInterval(resetVoiceRecog, 10000);

function resetVoiceRecog() {
  recognition.stop();
}

recognition.onend = function(event) {
  recognition.start();
}

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
  else if(saidWord.indexOf('timer') !== -1){
    //console.log('saidWord: ' + saidWord);
    //console.log('regex returns: ' + saidWord.match(/\d+\D/g));
    var regReturn = saidWord.match(/\d+\D/g);
    var minuteIndex = saidWord.indexOf('minute');
    var secondIndex = saidWord.indexOf('second');
    var minutes = 0;
    var seconds = 0;
    if(minuteIndex !== -1 && secondIndex !== -1){
      minutes = regReturn[0];
      seconds = regReturn[1];
    }
    else if(minuteIndex !== -1){
      minutes = regReturn[0]; 
    }
    else if (secondIndex !== -1){
      seconds = regReturn[0];
    }
    if(saidWord.indexOf('clear') !== -1){
      if(timerRunning){
        clearTimer();
      }
    }

    $("#minsfortimer").val(minutes);
    $("#secsfortimer").val(seconds);
    setTimer();

  } 

  else if(saidWord.indexOf('time') !== -1){
    sayCurrentTime();
  } 


//need to add regex here to pick the symbol out, shouldnt be too bad
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
  }   
}

// speech error handling
recognition.onerror = function(event){
  console.log('no speech detected');
  //startListening();
}


