// Imports
const express=require('express');

const Database=require('./obj/Database.cjs');

// Global variables
const db_path = __dirname + "/data/data.db"

const db = new Database(db_path);

// The application
var app=express();

// Styling & Scripts
app.use(express.static(__dirname + '/public'));

// Routing.
// - This section details the URLs available on the server.
//
//  Routes:
//
//    
//
// Index
app.get('/', function(req, res){
  res.send('This is the Application Programming Interface.')
});

// Storage
app.get('/data', function (req, res){

});

// Run @ HTTP Port
app.listen(8081, function(){
  console.log('API is running.')  
});
