// Imports
var express=require('express');

// The application
var app=express();

// Styling & Scripts
app.use(express.static(__dirname + '/public'));

// Routing.
// - This section details the URLs available on the server.
//
//  Routes:
//
//    /
//      - index
//      - Control & authentication
//
//    /down
//      - down
//      - Runs external scripts
//
// Index
app.get('/', function(req, res){
  res.sendfile(__dirname + '/views/index.html');
});

// Run @ Port
app.listen(8081);
