var express = require('express'),
	app = express();
app.use(express.static('public'));
app.use(express.json());
var routes = require('./src/routes/notesTakerRoutes'); //importing route

routes(app); // registering the routes from the routes file
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
