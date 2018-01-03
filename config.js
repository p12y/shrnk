var config = {};
config.db = {};

config.webroot = 'https://shrnk.glitch.me/';
config.dirname = __dirname;

config.db.user = 'default';
config.db.password = process.env.DB_PASSWORD;
config.db.url = process.env.DB_URL;

module.exports = config;