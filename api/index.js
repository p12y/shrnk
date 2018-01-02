var base58 = require('base58');
var Url = require('../models/url');
var validUrl = require('valid-url');
var config = require('../config');

var shrnk = {
  
  decodeUrl: function (req, res) {
    var encoded_url = req.params.encoded_url;
    var id = base58.decode(encoded_url);

    Url.findById(id, function(err, doc) {
      if (err) console.error(err);

      if (doc) {
        res.redirect(doc.long_url);
      } else {
        res.redirect('/');
      }
    });
  },
  
  encodeUrl: function (req, res) {
    var url = req.body.url || req.url.slice(8);

    if (!validUrl.isUri(url)){
      res.send(400);
      return;
    }

    var query = Url.where({ long_url: url });

    query.findOne(function(err, doc) {
      if (doc) {
        res.json({ short_url: config.webroot + base58.encode(doc.id), original_url: url });
      } else {
        var newUrl = new Url({ long_url: url });

        newUrl.save(function(err, newDoc) {
          if (err) console.error(err);

          res.json({ short_url: config.webroot + base58.encode(newDoc.id), original_url: url });
        });
      }
    });
  }
};


module.exports = shrnk;