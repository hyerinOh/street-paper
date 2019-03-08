const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/index.js');
const Paper = require('./models/data.js');

const app = express();

const DB_URL = 'mongodb://localhost:27017/project1';
mongoose.connect(DB_URL);

const db = mongoose.connection;
db.once('open', (() => {
  console.log(`connected to database at ${DB_URL}`);
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/components');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// app.use('/', ( req, res ) => {
//   console.log(123123)
//   res.json({a:232})
// });
app.get('/papers', async (req, res) => {
  console.log(11111)
  Paper.find( // try catch, await
    {
      'loc': {
        $near: {
          $geometry: {
             type: "Point",  // spacce
             coordinates: [ 25.087626 , 55.151134 ]
          },
        }
      }
    }
  )
    .then((paper) => {
      console.log(paper);
      res.json(paper);
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
