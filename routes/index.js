//var path = require('path');
var config = require('../config');
var bodyParser = require('body-parser');
require('dotenv').config();
var shrnk = require('../api');

function declareRoutes(app) {
  
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.use(bodyParser.json());
  
  app.get("/", function(req, res) {
    res.sendFile(config.dirname + '/views/index.html');
  });
  
  app.get("/api", function(req, res) {
    res.sendFile(config.dirname + '/views/api/index.html');
  });
  
  app.post('/api/shrink', function(req, res) {
    shrnk.encodeUrl(req, res);
  });
  
  app.get('/shrink/*', function(req, res) {
    shrnk.encodeUrl(req, res);
  });
  
  app.get('/:encoded_url', function(req, res,) {
    shrnk.decodeUrl(req, res);
  });

}

module.exports = declareRoutes;