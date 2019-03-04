const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Memo = require('./models/data');

const app = express();

const DB_URL = 'mongodb://localhost:27017/project1';
mongoose.connect(DB_URL);

const db = mongoose.connection;
db.once('open', (() => {
  console.log(`connected to database at ${DB_URL}`);
}));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Memo);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
