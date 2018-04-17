//SETUP AND CONFIGURATION
const db = require('./models');
//Connect to the MongoDB service
const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/todo-app');
//Requiring todo list to server
const Todo = require('./models/todo');
//Require express app 
const express = require('express'),
	bodyParser = require('body-parser');
//Generate a new express app and call it 'app'
const app = express();

var port = 3000;
//Serve static files in public 
app.use(express.static('public'));

//Body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true}));

//Initialize variable to use for our environment port

app.set('views', './views');
app.set('view engine', 'ejs');

//DATA 

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










//ROUTES 

//define a root route: localhost:3000/
app.get('/', function(req, res) {
	// res.sendFile('views/index.ejs', {root : __dirname});
	let data = {
		title: "Sample Title"}
	res.render('index', data);	
});






app.listen(3000, () => {
    console.log("I am listening");
});