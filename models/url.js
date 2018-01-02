var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config');

mongoose.connect('mongodb://' + config.db.user + ':' + config.db.password + config.db.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var counterSchema = new Schema({
  _id: { type: String, index: true },
  count: { type: Number, default: 0 }
});

var Counter = mongoose.model('Counter', counterSchema);

var urlSchema = new Schema({
  _id: { type: Number, index: true },
  long_url: String,
  created_at: Date
});

urlSchema.pre('save', function(next) {
  var self = this;
  Counter.findOneAndUpdate(
    { _id: 'url_count' }, 
    { $inc: { count: 1 } }, 
    function(err, counter) {
      if (err) return next(err);

      self._id = counter.count;
      self.created_at = new Date();
      next();
  });
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;
