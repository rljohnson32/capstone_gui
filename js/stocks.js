var dowURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^DJI&apikey=87NRCGVHUZZVF8HR"
var nasURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^IXIC&apikey=87NRCGVHUZZVF8HR"
var spURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^GSPC&apikey=87NRCGVHUZZVF8HR"
var lastClose = '';


$(document).ready(function($) {
  //setLastClose();
  updateStocks();
  setInterval(updateStocks, refreshRate*60000); //Update the stocks every 5 minutes.
});

function updateStocks(){
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
        $("#dow").html(curPercentRounded + '%');
        if(cur < 0){
          //$("#dow").style.color = "red";
          document.getElementById('dow').style.color = "red";
        }
        else{
          document.getElementById('dow').style.color = "green";
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
        $("#nas").html(curPercentRounded + '%');
        if(cur < 0){
          //$("#dow").style.color = "red";
          document.getElementById('nas').style.color = "red";
        }
        else{
          document.getElementById('nas').style.color = "green";
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
        $("#sp").html(curPercentRounded + '%');
        if(cur < 0){
          //$("#dow").style.color = "red";
          document.getElementById('sp').style.color = "red";
        }
        else{
          document.getElementById('sp').style.color = "green";
        }
     })
     .catch(function(err) {
      console.log('ERROR FETCHING DOW DATA:', err);
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

    //check if today is sunday or monday or saturday (no trading on the day before those days)
    if(weekday == 0){
      d.setDate(d.getDate()-2);
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
    else if(weekday == 1){
      d.setDate(d.getDate()-3);
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    else if(weekday == 6){
      d.setDate(d.getDate()-1);
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
}
