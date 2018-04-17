//Makes your models available to the rest of the app 

const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/todo-app');

module.exports.Todo = require("./todo.js");