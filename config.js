module.exports = {
  webroot: 'localhost:8080/',
  dirname: __dirname,
  db: {
    user: 'default',
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL,
  },
};
