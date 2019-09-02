const config = {
  webroot: 'https://shrnk.glitch.me/',
  dirname: __dirname,
  db: {
    user: 'default',
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL,
  },
};

module.exports = config;
