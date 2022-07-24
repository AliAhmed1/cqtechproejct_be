var express = require('express');
var router = express.Router();
const db = require('../db/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.select('*').from('students').then(function(data) {
    res.json(data);
  }
  ).catch(function(err) {
    res.json(err);
  });
});

router.put('/:studentid', function(req, res, next) {
  db('students')
  .where("studentid", req.params.studentid)
  .update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  })
  .then(function() {
    db.select('*').from('students').where({studentid: req.params.studentid})
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
  })
  .catch(function(err) {
    res.json(err);
  });
});

module.exports = router;
