var dowURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^DJI&apikey=87NRCGVHUZZVF8HR"
var nasURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^IXIC&apikey=87NRCGVHUZZVF8HR"
var spURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^GSPC&apikey=87NRCGVHUZZVF8HR"
var baseURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
var baseURLEND = "&apikey=87NRCGVHUZZVF8HR";
var lastClose = '';
var addedSymbols = [];
var addedPairs = [];


$(document).ready(function($) {
  //setLastClose();
  updateStocks();
  setInterval(updateStocks, 1*60000); //Update the stocks every 1 minutes.
});

function updateStocks(){
  var d = new Date();
  var hour   = d.getHours();
  var minute = d.getMinutes();
  var ap = "AM";
  if (hour   > 11) { ap = "PM";             }
  if (hour   > 12) { hour = hour - 12;      }
  if (hour   == 0) { hour = 12;             }
  if (minute < 10) { minute = "0" + minute; }
  $('#lastStockUpdate').html(hour + ':' + minute + ' ' + ap);

  var reqDow = new Request(dowURL);
  fetch(reqDow)
    .then((resp) => resp.json())
     .then(function(data) {

        var html;
        jsond = data;
        var timeSeries = data['Time Series (Daily)']
        var metadata = data['Meta Data'];
        var today = metadata['3. Last Refreshed'];
        lastClose = setLastClose(today);
        //alert(lastClose);
        var todayData = timeSeries[today];
        var lastData = timeSeries[lastClose];
        var close = todayData['4. close'];
        var prevClose = lastData['4. close'];
        var cur = close - prevClose;
        var curPercent = (cur / prevClose)*100;
        var curPercentRounded = Math.round(100*curPercent)/100;
        $("#DJI").html(curPercentRounded + '%');
        if(cur < 0){
          //$("#dow").style.color = "red";
          document.getElementById('DJI').style.color = "red";
        }
        else{
          document.getElementById('DJI').style.color = "green";
        }
     })
     .catch(function(err) {
      console.log('ERROR FETCHING DOW DATA:', err);
      //$("#weather").html(html);
  });

  var reqNas = new Request(nasURL);
  fetch(reqNas)
    .then((resp) => resp.json())
     .then(function(data) {

        var html;
        jsond = data;
        var timeSeries = data['Time Series (Daily)'];
        var metadata = data['Meta Data'];
        var today = metadata['3. Last Refreshed'];
        if(lastClose == ''){
          lastClose = setLastClose(today);
        }
        var todayData = timeSeries[today];
        var lastData = timeSeries[lastClose];
        var close = todayData['4. close'];
        var prevClose = lastData['4. close'];
        var cur = close - prevClose;
        var curPercent = (cur / prevClose)*100;
        var curPercentRounded = Math.round(100*curPercent)/100;
        $("#IXIC").html(curPercentRounded + '%');
        if(cur < 0){
          //$("#dow").style.color = "red";
          document.getElementById('IXIC').style.color = "red";
        }
        else{
          document.getElementById('IXIC').style.color = "green";
        }
     })
     .catch(function(err) {
      console.log('ERROR FETCHING DOW DATA:', err);
      //$("#weather").html(html);
  });

  var reqSp = new Request(spURL);
  fetch(reqSp)
    .then((resp) => resp.json())
     .then(function(data) {

        var html;
        jsonsp = data;
        var timeSeries = data['Time Series (Daily)'];
        var metadata = data['Meta Data'];
        var today = metadata['3. Last Refreshed'].substring(0,10);//substring0-10;
        if(lastClose == ''){
          lastClose = setLastClose(today);
        }
        var todayData = timeSeries[today];
        var lastData = timeSeries[lastClose];
        var close = todayData['4. close'];
        var prevClose = lastData['4. close'];
        var cur = close - prevClose;
        var curPercent = (cur / prevClose)*100;
        var curPercentRounded = Math.round(100*curPercent)/100;
        $("#GSPC").html(curPercentRounded + '%');
        if(cur < 0){
          //$("#dow").style.color = "red";
          document.getElementById('GSPC').style.color = "red";
        }
        else{
          document.getElementById('GSPC').style.color = "green";
        }
     })
     .catch(function(err) {
      console.log('ERROR FETCHING DOW DATA:', err);
      //$("#weather").html(html);
  });
  updateAdded();
}

function updateAdded(){
  //loop through and add symbols
  for(var i = 0; i < addedPairs.length; i++){
    var curPair = addedPairs[i];
    var curURL = curPair['URL'];
    var curSymbol = curPair['SYMBOL'];
    updateAddedHTML(curURL, curSymbol);
  }
}

function updateAddedHTML(curURL, curSymbol){
  //console.log("curURL: " + curURL + "curSymbol: " + curSymbol);
  fetch(curURL)
    .then((resp) => resp.json())
     .then(function(data) {

        var html;
        jsond = data;
        var timeSeries = data['Time Series (Daily)'];
        var metadata = data['Meta Data'];
        var today = metadata['3. Last Refreshed'].substring(0,10);//substring0-10;;
        if(lastClose == ''){
          lastClose = setLastClose(today);
        }
        var todayData = timeSeries[today];
        //console.log("todayData: " + todayData);
        var lastData = timeSeries[lastClose];
        //console.log("lastData: " + lastData);
        var close = todayData['4. close'];
        var prevClose = lastData['4. close'];
        var cur = close - prevClose;
        var curPercent = (cur / prevClose)*100;
        var curPercentRounded = Math.round(100*curPercent)/100;
        $("#"+curSymbol).html(curPercentRounded + '%');
        if(cur < 0){
          //$("#dow").style.color = "red";
          document.getElementById(curSymbol).style.color = "red";
        }
        else{
          document.getElementById(curSymbol).style.color = "green";
        }
     })
     .catch(function(err) {
      console.log('ERROR FETCHING' + curSymbol + ' DATA:', err);
      //$("#weather").html(html);
  });


}

function setLastClose(lastRefresh) {
    //yyyy-mm-dd
    var lf = lastRefresh.split("-");
    var d = new Date(lf[0], lf[1] - 1, lf[2]);
    //alert(d);
    var weekday = '' + d.getDay();
    //alert(weekday);

    //check if last refreshed day is monday (no trading on the day before so prev day should be friday)
    if(weekday == 1){
      d.setDate(d.getDate()-3);
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    else{
      d.setDate(d.getDate()-1);
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
}

function addSymbol(){
  var symbol = $("#newstock").val().toUpperCase();
  var url = baseURL + symbol + baseURLEND;
    
  var newReq = new Request(url);
  fetch(newReq)
    .then((resp) => resp.json())
     .then(function(data) {
        //alert("valid symbol");
        var html;
        jsonnew = data;
        if(data.hasOwnProperty('Error Message')){
          $("#newstock").val('');
          alert(symbol + ": INVALID SYMBOL");
          return;
        }
        else if(addedSymbols.includes(symbol)){
          alert("Already added: " + symbol);
          $("#newstock").val('');
          return;
        }
        else{
          addedSymbols.push(symbol);
          //var html = '<li>' + symbol + ':&nbsp&nbsp&nbsp<span id="' + symbol + '"></span></li>';
          var html = '<tr><td>' + symbol + '</td><td id="' + symbol + '"></td><td><button id="' + symbol + 'rm" class="btn"><i class="fa fa-close"></i></button></td></tr>'
          $('#stocklist').append(html);
          var button = document.getElementById(symbol+'rm');
          button.setAttribute('onclick', 'removeStock(this)');
          addedPairs.push({"URL":url, "SYMBOL":symbol});
          $("#newstock").val('');
          updateAdded();
        }
     })
     .catch(function(err) {
      console.log('ERROR VALIDATING NEW SYMBOL DATA:', err);
  });
  
}


function removeStock(row){
  var Tab = document.getElementById('stocklist');
  Tab.deleteRow(row.parentNode.parentNode.rowIndex);
  //addedSymbols.pop();
  var symboltoremove = row.id.replace('rm','');
  var url = baseURL + symboltoremove + baseURLEND;
  var index1 = addedSymbols.indexOf(symboltoremove);
  var index2 = addedPairs.indexOf({"URL":url, "SYMBOL":symboltoremove});
  if (index1 > -1) {
    addedSymbols.splice(index1, 1);
  }
  if (index2 > -1) {
    addedPairs.splice(index2, 1);
  }
  //console.log(row.id);
  //alert("removing " + row);
}

