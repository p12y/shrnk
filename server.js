require('dotenv').config();
var express = require('express');
var app = express();
var declareRoutes = require('./routes');

app.use(express.static('public'));

declareRoutes(app);

var listener = app.listen(process.env.PORT || 8080, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
