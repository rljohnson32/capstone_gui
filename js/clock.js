var months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var weekdays = new Array(7);
weekdays[0] =  "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";

var timerRunning = 0;
var timerSounds = ["1", "2", "3", "4", "5", "6"];
var curAlarm = "1";
var dateString;
var dateStringSay;

$(document).ready(function() {  
  updateClock(); //Set initial time on page load
  updateRoomTemp();
  //updateGreeting();
  setInterval(updateClock, 1000); // update the time every second
  setInterval(updateRoomTemp, 1*60000); //update room temp every 1 minutes
});

function updateClock(){
	var now    = new Date();
	var hour   = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	var ap = "AM";
	//var html = '<h2>'
	if (hour   > 11) { ap = "PM";             }
	if (hour   > 12) { hour = hour - 12;      }
	if (hour   == 0) { hour = 12;             }
	//if (hour   < 10) { hour   = "0" + hour;   }
	if (minute < 10) { minute = "0" + minute; }
	if (second < 10) { second = "0" + second; }
	var timeString = hour + ':' + minute/* + ':' + second*/ + " " + ap;
	var weekDay = weekdays[now.getDay()];
	var month = months[now.getMonth()];
	var day = now.getDate();
	dateStringSay = weekDay + ', ' + month + ' ' + day;
	dateString = dateStringSay;
	var greeting;
	
	// if(day == 1){
	// 	dateStringSay += 'st';
	// }
	// else if(day == 2){
	// 	dateStringSay += 'nd';
	// }
	// else if(day == 3){
	// 	dateStringSay += 'rd';
	// }
	// else{
	// 	dateStringSay += 'th';
	// }

	if(now.getHours() < 12){
		greeting = 'Good Morning!';
	}
	else if(now.getHours() < 16){
		greeting = 'Good Afternoon!';
	}
	else{
		greeting = 'Good Evening!';
	}
	$("#timeString").html(timeString);
	$("#date").html(dateString);
	$("#greeting").html(greeting);
	// html += '<input id="speakTime" type="submit" onclick="sayCurrentTime()" value="Say">';

	//html += '<input id="speakTime" type="submit" onclick="sayCurrentTime()" value="Say"></br>';
}

function updateRoomTemp(){
	//TODO: add an ajax call to read temp sensor and save the response for display
	var roomtemp = '76'  + '&deg;'+' F';
	$("#roomtemp").html(roomtemp);
}

function sayCurrentTime(){
	if(!responsiveVoice.isPlaying()) {
		var now    = new Date();
		var hour   = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		var ap = "AM";
		if (hour   > 11) { ap = "PM";             }
		if (hour   > 12) { hour = hour - 12;      }
		if (minute < 10) { minute = "0" + minute; }
		var curTimeString = "It is " + hour + " " + minute + " " + ap + ". " + getGreeting() + " Rob!";
		responsiveVoice.speak(curTimeString, "US English Female");
	}
}

function sayCurrentDate(){
	responsiveVoice.speak('Today is ' + dateStringSay, "US English Female");	

}

function getGreeting(){
	var now    = new Date();
	var hour   = now.getHours();

	if(hour < 12){
		return 'Good Morning';
	}
	else if(hour < 16){
		return 'Good Afternoon';
	}
	else{
		return 'Good Evening';
	}
}

// function setTimer(){
// 	if(timerRunning == 0){
		
// 		var minutes = parseInt($("#minsfortimer").val());
// 		var seconds = parseInt($("#secsfortimer").val());
// 		alert(minutes + seconds);
// 		if(minutes != 0 || seconds != 0){
// 			var timerduration = (minutes*60+seconds)*1000;
// 			setTimeout(timerDone, timerduration);
// 			var html;
// 			html = '<p id="timer1">Timer: ' + minutes + ' Minutes  ' + seconds + ' seconds <input type="submit" onclick="clearTimer()" value="Clear"></p>';
// 			$("#timer").append(html);
// 		}
// 		else{
// 			return;
// 		}	
// 	}
// 	else{
// 		alert("A timer is already running");
// 	}

// }

function timerDone(){
		document.getElementById('alarm' + curAlarm).play();
		var text = '<b><p id="timer1">Timer Done' + ' <input type="submit" onclick="clearTimer()" value="Clear"></p></b>'
		$("#countdown").html(text);

}

function clearTimer(){
	if(timerRunning){
		clearInterval(x);
		timerRunning = 0;
		document.getElementById('alarm' + curAlarm).pause();
		//$("#timer1").remove();
		$("#countdown").html('');
		document.getElementById('minsfortimer').value = '';
		document.getElementById('secsfortimer').value = '';
	}
}

var x;

function setTimerTest(min){
	$("#minsfortimer").val(min)
	setTimer();
}

function setTimer(){
	if(timerRunning == 0){

		//need, month, day, year, hour min sec
		var minutes = parseInt($("#minsfortimer").val());
		var seconds = parseInt($("#secsfortimer").val());
		if(isNaN(minutes)){
			minutes = 0;
		}
		if(isNaN(seconds)){
			seconds = 0;
		}

		if(minutes != 0 || seconds != 0){
			if(minuterow.style.display === "block"){
				toggleTimerForm();
			}
			timerRunning = 1;
			var now = new Date().getTime();
			var end = now + (minutes*60+seconds+1)*1000;
			x = setInterval(function(){
				//if(timerRunning == 0){clearInterval(x)}
				var nowMil = new Date().getTime();
				var distance = end - nowMil;
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	    		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	    		if (minutes < 10) { minutes = "0" + minutes; }
				if (seconds < 10) { seconds = "0" + seconds; }
				var html;
				html = '<b><p id="timer1">Timer: ' + minutes + ':' + seconds + ' <input type="submit" onclick="clearTimer()" value="Clear"></p></b>';
				$("#countdown").html(html);
				
				if(distance <= 1000){
					clearInterval(x);
					timerDone();
				}

			}, 1000);
		}
		else{
			$("#minsfortimer").val('');
			$("#secsfortimer").val('');
			return;
		}
	}
	else{
		$("#minsfortimer").val('');
		$("#secsfortimer").val('');
		// alert("A timer is already running");
	}

}

function updateSound(){
	curAlarm = document.getElementById("soundPicker").value;
}

function toggleTimerForm() {
	if(timerRunning == 0){
	  //var minuterow = document.getElementById("minuterow");
	  $("#minuterow").toggle('slow', function() {
    	document.getElementById("minsfortimer").focus();
  		});
   	  $("#secondrow").toggle('slow');
  	  $("#selectrow").toggle('slow');
  	  $("#inputrow").toggle('slow');
  	}
}




