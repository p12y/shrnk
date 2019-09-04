const Base58 = require('base58');
const urlRegex = require('url-regex');
const Url = require('../models/url');
const config = require('../config');

const createShortUrl = url => `${config.webroot}/${Base58.int_to_base58(url)}`;

const api = {
  /**
   * Decode a shortened url to an integer & fetch record from database
   * Then, redirect to the original long URL
   */
  decodeUrl: (req, res) => {
    const encodedUrl = req.params.encodedUrl;
    const id = Base58.base58_to_int(encodedUrl);

    Url.findOne({ id }, (err, doc) => {
      if (err) console.error(err);
      if (doc) return res.redirect(doc.longUrl);
      return res.redirect('/');
    });
  },

  /**
   * Encode a new long URL and save in the database
   * If URL exists, just return the short URL
   */
  encodeUrl: (req, res) => {
    let url = req.body.url;
    const httpRegex = /^http[s]*:\/{2}.+/;

    if (!httpRegex.test(url)) url = `http://${url}`;

    const isValidUrl = urlRegex({ exact: true }).test(url);

    if (!isValidUrl) return res.sendStatus(400);

    Url.findOne({ longUrl: url }, (findErr, doc) => {
      if (findErr) return console.error(findErr);

      if (doc) {
        res.json({
          shortUrl: createShortUrl(doc.id),
          originalUrl: url,
        });
      } else {
        const newUrl = new Url({ longUrl: url });

        newUrl.save((saveErr, newDoc) => {
          if (saveErr) console.error(saveErr);

          res.json({
            shortUrl: createShortUrl(newDoc.id),
            originalUrl: url,
          });
        });
      }
    });
  },
};

module.exports = api;
