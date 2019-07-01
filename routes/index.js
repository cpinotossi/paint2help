var express = require('express');
var router = express.Router();

var userName = "Christian";

/* GET home page. */
router.get('/', function(req, res, next) {
  //render result
  res.render('index', {
    title: userName,
  });
})


module.exports = router;
