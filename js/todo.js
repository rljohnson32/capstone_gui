var addedTodos = [];
var addedTodoNoSpace = [];
var todoCounter = 0;

$(document).ready(function($) {
	//call function to fetch local list data and populate the list
});

function addTodo(){
  	var todo = $("#newtodo").val();
  	todo = todo.charAt(0).toUpperCase() + todo.slice(1);
  	if(todo == ''){
  		return;
  	}
    
	if(addedTodos.includes(todo)){
		$("#newtodo").val('');
		  return;
	}
	else{
	  var todonospaces = todo.replace(/\s/g, '');
	  addedTodos.push(todo);
	  addedTodoNoSpace.push(todonospaces);
	  var html = '<tr><td id="' + todonospaces + '">' + todo + '</td><td><div id="' + todonospaces + 'rm" style="font-size:15px;color:red; float:right"><i class="fa fa-minus-circle"></i></div></td></tr>'
	  $('#todolist').append(html);
	  var button = document.getElementById(todonospaces + 'rm');
	  button.setAttribute('onclick', 'removeTodo(this)');
	  $("#newtodo").val('');
	  document.getElementById("newtodo").focus();
	}
}

function toggleTodoForm() {
    $("#todoForm").toggle('slow', function() {
    	document.getElementById("newtodo").focus();
  	});
}

var todoEnter = document.getElementById("newtodo");
todoEnter.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

function findTodoRow(index){
	if(index <= addedTodos.length){
		var table = document.getElementById("todolist");
		var row = table.rows[index];
		var todo = row.cells[0].innerHTML;
		var todonospaces = todo.replace(/\s/g, '');
		var removeid = todonospaces + 'rm';
		var rowObject = document.getElementById(removeid);
		removeTodo(rowObject);
	}
}

function removeTodo(row){
  var Tab = document.getElementById('todolist');
  Tab.deleteRow(row.parentNode.parentNode.rowIndex);
  var todotoremove = row.id.replace('rm','');
  var index2 = addedTodoNoSpace.indexOf(todotoremove);
  if (index2 > -1) {
    addedTodos.splice(index2, 1);
    addedTodoNoSpace.splice(index2, 1);
  }
}

function sayTodos(){
	var todoStrings = [];
	var table = document.getElementById("todolist");
	for (var i = 1, row; row = table.rows[i]; i++) {
	   var curTodo = table.rows[i].cells[0].innerHTML;
	   todoStrings.push(curTodo);
	}
	if(todoStrings.length == 0){
		responsiveVoice.speak("Your to do list is currently empty.", "US English Female");
		return;
	}
	responsiveVoice.speak("Reading your to-do list.", "US English Female");

	for(var i = 0; i < todoStrings.length; i++){
		var curString = todoStrings[i];
		responsiveVoice.speak(curString, "US English Female");
	}
}

