      var eventDate;
      // Client ID and API key from the Developer Console
      var CLIENT_ID = '969460732121-ah4bao5ja1mc0j023gt9gqa0tkc1rkm9.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyB7dYWY0Z9UdyKNoK7MImJKrQ4A7RINkdA';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');
      var eventText = document.getElementById('events');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          setInterval(listUpcomingEvents, 30*60000); //Update the events every 30 minutes.
          listUpcomingEvents();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
          //clear the events
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        if($('#eventlist').css('display') == 'none'){
          toggleEvents();
        }
        
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        toggleEvents();
        $('#events').html('');
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message, time) {
        //var pre = document.getElementById('events');
        //var html = '<li><b>' + message + '</b> ' + time + '</li>';
        var html = '<tr><td><b>' + message+ '</b></td><td>' + time + '</td></tr>';

        $('#eventlist').append(html);

        //var textContent = document.createTextNode(message + '\n');
        //pre.appendChild(textContent);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'somkqn37tbo1mlas7d5fa0tngbo6l1os@import.calendar.google.com',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 6,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          //appendPre('Upcoming events:');

          var d = new Date();
          var houru   = d.getHours();
          var minuteu = d.getMinutes();
          var apu = "AM";
          if (houru   > 11) { apu = "PM";             }
          if (houru   > 12) { houru = houru - 12;     }
          if (houru   == 0) { houru = 12;             }
          if (minuteu < 10) { minuteu= "0" + minuteu; }
          $('#lastEventUpdate').html(houru + ':' + minuteu + ' ' + apu);

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              eventDate = event;
              var whenDay = event.start.dateTime.toString().substring(0,10);
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
                //alert(when);
              }
              var ap = "AM";

              var d = new Date(when);
              var hour   = d.getHours();
              if (hour   > 11) { ap = "PM";             }
              var minute = d.getMinutes();
              var month = d.getMonth()+1;
              var day = d.getDate();
              if (hour   > 12) { hour = hour - 12;      }
              if (hour   == 0) { hour = 12;             }
              if (minute < 10) { minute = "0" + minute; }
              when = month + '/' + day + ' ' + hour + ':' + minute + ' ' + ap;
              //console.log(d);
              appendPre(event.summary, when);
            }
          } else {
            appendPre('No upcoming events found.');
          }
        });
      }

function toggleEvents(){
  $('#eventlist').toggle();
}