const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Paper = require('./models/data.js');

const app = express();

const DB_URL = 'mongodb://localhost:27017/project1';
mongoose.connect(DB_URL);

const db = mongoose.connection;
db.once('open', (() => {
  console.log(`connected to database at ${DB_URL}`);
}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/papers', (req, res) => { // async
  console.log('-----server----');
  console.log('req', req.query);
  Paper.find( // try catch, await
    {
      loc: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [req.query.lon, req.query.lat]
          },
          $maxDistance: 1000
        }
      }
    }
  )
    .then((papers) => {
      console.log(papers);
      papers.forEach((paper) => {
        console.log(paper.loc);
      });
      res.json(papers);
    });
});
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
});

const port = 8081;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
