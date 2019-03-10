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

app.get('/papers/location', async (req, res, next) => {
  console.log(req.query)
  try {
    const getPapersById = await Paper.find(
      {
        loc: {
          type: 'Point',
          coordinates: [Number(req.query.lon), Number(req.query.lat)]
        }
      }
    );
    console.log(getPapersById);
    res.json(getPapersById);
  } catch (error) {
    next(error);
  }
});

app.post('/papers/new', (req, res) => {
  const paperList = req.body;
  const paper = new Paper(paperList);
  console.log('req', paperList);
  paper.save((err) => {
    if (err) {
      console.log(err);
      res.json({ result: 0 });
      res.status(400);
      return;
    }
    res.json({ result: 1 });
    res.status(200);
  });
});

app.get('/papers', async (req, res, next) => {
  try {
    const orderedByShortDistance = await Paper.find(
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
    ).select({ _id: 1, loc: 1 });
    res.json(orderedByShortDistance);
  } catch (error) {
    next(error);
  }
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
