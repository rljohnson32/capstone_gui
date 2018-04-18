/*
TODO: 
1.) Add voice commands to read off events,
ex; You have __ events today, then read them.

2.)Use the json data of companies/symbols to enable abbilty to add a symbol by saying the company
ex; How is Microsofts stock doing. or Microsoft stock or Microsoft stock update.

Might need to search all words in captured string against all the company names (could be very slow)
Add ability to remove sotkcs from list

3.) Voice control / synthesis for news. Ability to read top stories from all categories.
ex; Sports news update, technology news update, top news stories

4.) Time:add ability to say the full date (day of week / month / day and stuff )

5.) better weather voice control: 
will it rain today/chance of rain today, 
current temperature (add extra stuff if cold / hot like 'Brrrr' or 'wow, nice day')
also, need to be able to change location
weather IN london england (match IN and then 2 words)
weahter in 53029 (match IN and then a 5 digit number)
hows the weather looking for tomorrow
how is the forcast looking for this week (just need to match the word forecast)
add special things if weather is gonna be nice
  ex; if temps over 60 in the forecast say, its gonna be nice on ____, high temps over 60!
*/

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
  var saidWord = (event.results[resultsLength][ArrayLength].transcript).toLowerCase();
  console.log('Processing voice: ' + saidWord);
  //var prevWord = event.results[resultsLength][ArrayLength-1].transcript;

  if (saidWord.indexOf('weather') !== -1){
    if(saidWord.indexOf('local') !== -1){
      getLocation();
    }
    else if(saidWord.indexOf('forecast') !== -1){
      toggleForecast();
    }
    
    var regReturnZip = saidWord.match(/\d{5}/g);
    if(regReturnZip){
      $("#zip").val(regReturnZip);
      getZip();
    }

    var regReturnLocation = saidWord.match(/in \w+ \w+/g);
    if(regReturnLocation){
      console.log(regReturnLocation);
      var splitArray = regReturnLocation[0].split(' ');
      console.log(splitArray);
      $("#city").val(splitArray[1]);
      $("#state").val(splitArray[2]);
      getCity();
    }

    setTimeout(function(){
      sayCurrentWeather();
    }, 500);

  }
  else if(saidWord.indexOf('quote') !== -1){
    if(saidWord.indexOf('new') !== -1){
      updateQuote();
    }
    sayQuote();

  }
  else if(saidWord.indexOf('timer') !== -1){
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

  else if(saidWord.indexOf('news') !== -1){
    //$("#drop").val();
    if(saidWord.indexOf('categor') !== -1){
      if(saidWord.indexOf('business') !== -1){
        $("#drop").val('business');
        updateURL();
      }
      else if(saidWord.indexOf('entertainment') !== -1){
        $("#drop").val('entertainment');
        updateURL();
      }
      else if(saidWord.indexOf('health') !== -1){
        $("#drop").val('health');
        updateURL();
      }
      else if(saidWord.indexOf('science') !== -1){
        $("#drop").val('science');
        updateURL();
      }
      else if(saidWord.indexOf('sport') !== -1){
        $("#drop").val('sports');
        updateURL();
      }
      
      else if(saidWord.indexOf('tech') !== -1){
        $("#drop").val('technology');
        updateURL();
      }
    }
    else if(saidWord.indexOf('read') !== -1){
      readNews();
    }
    else if(saidWord.indexOf('more') !== -1){
      showMore();
    }

  }

  else if(saidWord.indexOf('time') !== -1){
    sayCurrentTime();
  }

  else if(saidWord.indexOf('date') !== -1){
    sayCurrentDate();
  }

  else if(saidWord.indexOf('rain') !== -1){
    sayRainChance();
  }

  else if(saidWord.indexOf('forecast') !== -1){
    toggleForecast();
  }


//need to add regex here to pick the symbol out, shouldnt be too bad
  else if(saidWord.indexOf('stock') !== -1){
    // if(saidWord.indexOf('add') !== -1){
    //   console.log(saidWord + 'index of add is: ' + saidWord.indexOf('add'));
    //   console.log( "this should be GE: " + saidWord[4] );
    //   alert("stock and add detected");
    //   var symbol = saidWord[4] + saidWord[5];
    //   alert(symbol);
    //   $("#newstock").val(symbol);// = symbol;
    //   addSymbol();
    // }
    var regReturnStock = saidWord.match(/symbol\b \S{1,4}$/g);
    if(regReturnStock){
      //console.log(regReturnStock);
      var splitArrayS = regReturnStock[0].split(' ');
      //console.log(splitArrayS);
      $("#newstock").val(splitArrayS[1]);
      addSymbol();
    }
    

    else if(saidWord.indexOf('brief') !== -1){
     sayStocks(); 
    }
  }   
}

// speech error handling
recognition.onerror = function(event){
  //console.log('no speech detected');
  //startListening();
}


