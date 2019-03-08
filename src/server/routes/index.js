const express = require('express');
const bodyParser = require('body-parser');
// const Memo = require('./');

const router = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// router.get('/papers', (req, res) => {
//   console.log(Memo.find({}))
//   res.render('MapPage', { name: 'hyerin' });
// });

module.exports = router;
