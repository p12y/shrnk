const config = require('../config');
const bodyParser = require('body-parser');
const shrnk = require('../api');

function declareRoutes(app) {
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.sendFile(`${config.dirname}/views/index.html`);
  });

  app.get('/api', (req, res) => {
    res.sendFile(`${config.dirname}/views/api/index.html`);
  });

  app.post('/api/shrink', (req, res) => {
    shrnk.encodeUrl(req, res);
  });

  app.get('/shrink/*', (req, res) => {
    shrnk.encodeUrl(req, res);
  });

  app.get('/:encodedUrl', (req, res) => {
    shrnk.decodeUrl(req, res);
  });
}

module.exports = declareRoutes;
