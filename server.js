//SETUP AND CONFIGURATION
const db = require('./models');
//Connect to the MongoDB service
const mongoose = require('mongoose');
	if (process.env.NODE_ENV == "production") {
  	mongoose.connect(process.env.MLAB_URL)
	} else {
  	mongoose.connect("mongodb://localhost/whenpresident");
	}
//Requiring todo list to server
const Todo = require('./models/todo');
//Require express app 
const express = require('express'),
	bodyParser = require('body-parser');
//Generate a new express app and call it 'app'
const app = express();

var port = 3001;
//Serve static files in public 
app.use(express.static('public'));

//Body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true}));

//Initialize variable to use for our environment port

app.set('views', './views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3001)

//DATA 



//ROUTES 


//define a root route: localhost:3000/
app.get('/', function(req, res) {
	res.render('index');	
});

//Get all tasks
app.get('/api/todo', function (req, res) {
	db.Todo.find(function(err, todo) {
		if(err) {
			console.log("index error: " + err);
			res.sendStatus(500);
		}
		res.json(todo);
	});
});

//Get one task 
app.get('/api/todo/:id', function (req, res) {
	//find one task by it's id
	console.log('task shown', req.params);
	db.Todo.find(function(err, todo) {
		res.json(todo[req.params.id-1]);
	})
});


//create and update task 
app.post('/api/todo', function (req, res) {
  // create new book with form data (`req.body`)
  let newTask = req.body;
  db.Todo.findOneAndUpdate({ $or: [ {task: newTask.task}, {description: newTask.description} ]}, newTask, {upsert: true}, function(err, todos) {
    res.json(todos) 
  });
});


//Delete task 
app.delete('/api/todo/:id', function (req, res) {
	console.log('task delete', req.params);
	var taskId = req.params.id;
	db.Todo.findOneAndRemove({_id: taskId}, function(err, todo) {
		console.log('task is deleted', req.params);
		res.json(todo);
	})
});

 app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })