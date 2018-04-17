var db = require('./models');

// var todo_list = [
//   {
//     task: "Task 1",
//     description: "Take out the trash",
   
//   },
//   {
//     task: "Task 2",
//     description: "Do the dishes",
    
//   },
//   {
//     task: "Task 3",
//     description: "Finish homework",
   
//   },
//   {
//     task: "Task 4",
//     description: "Clean bathroom",
    
//   }, 
    
// ];

// remove all records that match {} -- which means remove ALL tasks
db.Todo.remove({}, function(err, todos){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all tasks');

    // create new records based on the array tasks_list
    db.Todo.create(todo_list, function(err, todos){
      if (err) { return console.log('err', err); }
      console.log("created", todo_list.length, "list");
      process.exit();
    });
  }
});
