const mongoose = require('mongoose');
const config = require('../config');
const Schema = mongoose.Schema;

const logConnectionError = err => console.error('Connection error', err);

mongoose
  .connect(
    `mongodb+srv://${config.db.user}:${config.db.password}${config.db.url}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .catch(logConnectionError);

mongoose.connection.on('error', logConnectionError);

const counterSchema = new Schema({
  id: { type: String, index: true },
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

const urlSchema = new Schema({
  id: { type: Number, index: true },
  longUrl: String,
  createdAt: Date,
});

urlSchema.pre('save', function(next) {
  Counter.findOneAndUpdate(
    { id: 'urlCount' },
    { $inc: { count: 1000 } },
    (err, counter) => {
      if (err) return next(err);

      this.id = counter.count;
      this.createdAt = new Date();
      next();
    }
  );
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
