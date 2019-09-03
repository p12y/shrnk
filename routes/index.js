const bodyParser = require('body-parser');
const config = require('../config');
const api = require('../api');

const declareRoutes = app => {
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.sendFile(`${config.dirname}/views/index.html`);
  });

  app.get('/api', (req, res) => {
    res.sendFile(`${config.dirname}/views/api/index.html`);
  });

  app.post('/api/shrink', (req, res) => {
    api.encodeUrl(req, res);
  });

  app.get('/:encodedUrl', (req, res) => {
    api.decodeUrl(req, res);
  });
};

module.exports = declareRoutes;
