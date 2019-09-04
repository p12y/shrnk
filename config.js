module.exports = {
  webroot: 'https://shrnk-url.appspot.com',
  dirname: __dirname,
  db: {
    user: 'default',
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL,
  },
};
