var express = require('express'),
	app = express(),
	port = 8080;
app.use(express.static('public'));
app.use(express.json());
var routes = require('./src/routes/notesTakerRoutes'); //importing route

routes(app); // registering the routes from the routes file


app.listen(port);

console.log('Notes Taker is now running on port test : ' + port);