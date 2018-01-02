var config = {};
config.db = {};

config.webroot = 'https://shrnk.glitch.me/';
config.dirname = __dirname;

config.db.user = 'default';
config.db.password = process.env.DB_PASSWORD;
config.db.url = '@ds123136.mlab.com:23136/url_shortener_api';

module.exports = config;