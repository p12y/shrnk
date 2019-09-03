require('dotenv').config();
const express = require('express');
const app = express();
const declareRoutes = require('./routes');

app.use(express.static('public'));

declareRoutes(app);

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
