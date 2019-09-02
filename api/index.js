const base58 = require('base58');
const Url = require('../models/url');
const validUrl = require('valid-url');
const config = require('../config');

const shrnk = {
  decodeUrl: (req, res) => {
    const encodedUrl = req.params.encodedUrl;
    const id = base58.decode(encodedUrl);

    Url.findOne({ id }, (err, doc) => {
      if (err) console.error(err);

      if (doc) {
        res.redirect(doc.longUrl);
      } else {
        res.redirect('/');
      }
    });
  },
  encodeUrl: (req, res) => {
    const url = req.body.url || req.url.slice(8);

    if (!validUrl.isUri(url)) {
      return res.send(400);
    }

    const query = Url.findOne({ longUrl: url }, (findErr, doc) => {
      if (findErr) return console.error(findErr);
      if (doc) {
        res.json({
          short_url: `${config.webroot}${base58.encode(doc.id)}`,
          originalUrl: url,
        });
      } else {
        const newUrl = new Url({ longUrl: url });

        newUrl.save((saveErr, newDoc) => {
          if (saveErr) console.error(saveErr);

          res.json({
            short_url: `${config.webroot}${base58.encode(newDoc.id)}`,
            originalUrl: url,
          });
        });
      }
    });
  },
};

module.exports = shrnk;
