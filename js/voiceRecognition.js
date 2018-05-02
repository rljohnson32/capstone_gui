/*
TODO: 
1.) Add voice commands to read off events,
ex; You have __ events today, then read them.

2.)Use the json data of companies/symbols to enable abbilty to add a symbol by saying the company
ex; How is Microsofts stock doing. or Microsoft stock or Microsoft stock update.

Might need to search all words in captured string against all the company names (could be very slow)
Add ability to remove sotkcs from list

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
      if(regReturnZip != $("#zip").val()){
        $("#zip").val(regReturnZip);
        getZip();
      }
      else{
        return;
      }

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
    }, 750);

  }
  else if(saidWord.indexOf('quote') !== -1){
    if(saidWord.indexOf('new') !== -1){
      updateQuote();
    }
    if(saidWord.indexOf('read') !== -1){
          sayQuote();
    }


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

  else if(saidWord.indexOf('what time is') !== -1){
    sayCurrentTime();
  }

  else if(saidWord.indexOf('date') !== -1){
    sayCurrentDate();
  }

  else if(saidWord.indexOf('rain') !== -1){
    if((saidWord.indexOf('percent') == -1) && (saidWord.indexOf('today in') == -1)){
      sayRainChance();
    }
  }

  else if(saidWord.indexOf('forecast') !== -1){
    toggleForecast();
  }

  else if(saidWord.indexOf('stock') !== -1){
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

  else if(saidWord.indexOf('do') !== -1){
    if(saidWord.indexOf('add') !== -1){
      var regReturnTodo = saidWord.match(/item[s]? (.+)/);
      if(regReturnTodo){
        $("#newtodo").val(regReturnTodo[1]);
        addTodo();
      }
    }
    var regReturnRead = saidWord.match(/what do i have to[-]?[ ]?do/g);
    if(regReturnRead){
     sayTodos(); 
    }
    if(saidWord.indexOf('remove') !== -1){
      var regReturnRemove = saidWord.match(/(move to[-]?[ ]?do( list)? item (number )?(one)?(won)?(two)?(to)?(too)?(three)?(four)?(five)?(six)?(seven)?(eight)?(nine)?(ten)?(\d+)?)/);
      if(regReturnRemove){
        var splitArrayR = regReturnRemove[0].split(' ');
        var index = splitArrayR[splitArrayR.length - 1];
        if(isNaN(index)){
          if(index == 'one'){
            index = 1;
          }
          else if(index == 'two'){
            index = 2;
          }
          else if(index == 'three'){
            index = 3;
          }
          else if(index == 'four'){
            index = 4;
          }
          else if(index == 'five'){
            index = 5;
          }
          else if(index == 'six'){
            index = 6;
          }
          else if(index == 'seven'){
            index = 7;
          }
          else if(index == 'eight'){
            index = 8;
          }
          else if(index == 'nine'){
            index = 9;
          }
          else if(index == 'ten'){
            index = 10;
          }
        }
        if(!isNaN(index) && index > 0){
          findTodoRow(index);
        }
      }
    } 
  }

    // else if(saidWord.indexOf('light') !== -1){
  //   if(saidWord.indexOf('color') !== -1){
  //     if(saidWord.indexOf('red') !== -1){
  //       updateLights('red');
  //     }
  //     else if(saidWord.indexOf('orange') !== -1){
  //       updateLights('orange');
  //     }
  //     else if(saidWord.indexOf('yellow') !== -1){
  //       updateLights('yellow');
  //     }
  //     else if(saidWord.indexOf('green') !== -1){
  //       updateLights('green');
  //     }
  //     else if(saidWord.indexOf('blue') !== -1){
  //       updateLights('blue');
  //     }
  //     else if(saidWord.indexOf('purple') !== -1){
  //       updateLights('purple');
  //     }
  //     else if(saidWord.indexOf('orange') !== -1){
  //       updateLights('orange');
  //     }
  //   }
  //   else if(saidWord.indexOf('animate') !== -1){
  //     animateLights();
  //   }
  // }

}

// speech error handling
recognition.onerror = function(event){
  //console.log('no speech detected');
  //startListening();
}


