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

$(document).ready(function() {  
  updateClock(); //Set initial time on page load
  updateGreeting();
  setInterval(updateClock, 1000); // update the time every second
  setInterval(updateGreeting, 1800000); //update greeting every 30 minutes
});

function updateClock(){
	var now    = new Date();
	var hour   = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	var ap = "AM";
	var html = '<h2>'
	if (hour   > 11) { ap = "PM";             }
	if (hour   > 12) { hour = hour - 12;      }
	if (hour   == 0) { hour = 12;             }
	//if (hour   < 10) { hour   = "0" + hour;   }
	if (minute < 10) { minute = "0" + minute; }
	if (second < 10) { second = "0" + second; }
	var timeString = hour + ':' + minute + ':' + second + " " + ap;

	html += timeString + '</h2>'
	var weekDay = weekdays[now.getDay()];
	var month = months[now.getMonth()];
	var day = now.getDate();
	html += '<b>'+weekDay + ', ' + month + ' ' + day+'</b>';

	if(now.getHours() < 12){
		html += '<p>Good Morning!</p>';
	}
	else if(now.getHours() < 16){
		html += '<p>Good Afternoon!</p>';
	}
	else{
		html += '<p>Good Evening!</p>';
	}

	$("#clock").html(html);
}

function updateGreeting(){
	var html;
	var now    = new Date();
	var hour   = now.getHours();

	if(hour < 12){
		html = '<h2>Good Morning!</h2>';
	}
	else if(hour < 16){
		html = '<h2>Good Afternoon!</h2>';
	}
	else{
		html = '<h2>Good Evening!</h2>';
	}
	$("#greeting").html(html);

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
		alert("A timer is already running");
	}

}

function updateSound(){
	curAlarm = document.getElementById("soundPicker").value;
}



