const express = require('express');
const Paper = require('../models/data');

const router = express.Router();

router.post('/papers/new', async (req, res, next) => {
  try {
    const paperList = {
      nickname: req.body.nickname,
      memo: req.body.memo,
      loc: {
        type: 'Point',
        coordinates: [req.body.lon, req.body.lat]
      },
      createdAt: new Date().toISOString()
    };

    const paper = new Paper(paperList);
    try {
      const savePapers = await paper.save();
      console.log(savePapers);
    } catch (err) {
      console.log(err);
    }
    res.status(200).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
});

router.get('/papers', async (req, res, next) => {
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
    );
    res.json(orderedByShortDistance);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
