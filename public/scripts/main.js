console.log("Sanity Check: JS is working!");
var $tasksList;
var allTasks = [];

$(document).ready(function() {
	$("#title").addClass('animated bounceInUp', 1000);
 

$tasksList = $('#todoTarget');
$.ajax({
	method: 'GET',
	url: '/api/todo',
	success: handleSuccess,
	error: handleError
});

$('#newTaskForm').on('submit', function(event) {
	event.preventDefault();
	$.ajax({
		method: 'POST',
		url: '/api/todo' ,
		data: $(this).serialize(),
		success: newTaskSuccess,
		error: newTaskError
	});
});



$tasksList.on('click', '.deleteBtn', function() {
	console.log('clicked delete button to', 'api/todo/'+$(this).attr('data-id'));
	$.ajax({
		method: 'DELETE',
		url: '/api/todo/'+$(this).attr('data-id'),
		success: deleteTaskSuccess,
		error: deleteTaskError
	});
 });


});

function getTaskHtml(todo) {
	return `<hr>
			<p>
			   <span class = "chorename">Task ${todo.task}</span>
			   <span class = "chore-text-center">${todo.description}</span>
			   <button type="button" name="button" class="deleteBtn btn btn-warning pull-right" data-id=${todo._id}>Delete</button>
          </p>`;
}
function getAllTasksHtml(todos) {
	return todos.map(getTaskHtml).join("");
}

function render() {
	$tasksList.empty();
	// pass 'allTasks' into the template function
	var tasksHtml = getAllTasksHtml(allTasks);
	//append html to the view
	$tasksList.append(tasksHtml);
};

function handleSuccess(json) {
	allTasks = json;
	render();
}

function handleError(e) {
	console.log('uh oh');
	$('#taskTarget').text('Failed to load tasks, is the server working?');
}

function newTaskSuccess(json) {
	$('#newTaskForm input').val('');
	allTasks.push(json);
	render();
}
function newTaskError(err) {
	console.log('newtask error!', err);
}
function deleteTaskSuccess(json) {
	var todo = json;
	console.log(json);
	var taskId = todo._id;
	console.log('delete book', taskId);

	for(var index = 0; index < allTasks.length; index++) {
		if(allTasks[index]._id === taskId) {
			allTasks.splice(index, 1);
			break;
		}
	}
	render();
}

function deleteTaskError() {
	console.log('deletetask error!');
}
