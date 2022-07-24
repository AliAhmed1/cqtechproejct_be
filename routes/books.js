var express = require('express');
var router = express.Router();
const db = require('../db/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.select('*').from('books').join('students', 'books.studentid', 'students.studentid')
  .then(function(data) {
    res.json(data);
  }
  ).catch(function(err) {
    res.json(err);
  });
});
router.put('/:bookid', function(req, res, next) {
  db('books')
  .where("bookid", req.params.bookid)
  .update({
    book_name: req.body.book_name,
    author: req.body.author,
    date_of_borrow: req.body.date_of_borrow,
    date_of_return: req.body.date_of_return,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  })
  .then(function() {
    db.select('*').from('books').join('students', 'books.studentid', 'students.studentid')
    .then(function(data) {
      res.json(data);
    }
    ).catch(function(err) {
      res.json(err);
    });
  })
  .catch(function(err) {
    res.json(err);
  });
});

module.exports = router;
