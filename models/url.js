const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

mongoose.connect(
  `mongodb+srv://${config.db.user}:${config.db.password}${config.db.url}`,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const counterSchema = new Schema({
  id: { type: String, index: true },
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

const urlSchema = new Schema({
  id: { type: Number, index: true },
  longUrl: String,
  created_at: Date,
});

urlSchema.pre('save', function(next) {
  const url = this;
  Counter.findOneAndUpdate(
    { id: 'urlCount' },
    { $inc: { count: 1 } },
    (err, counter) => {
      if (err) return next(err);

      url.id = counter.count;
      url.created_at = new Date();
      next();
    }
  );
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
