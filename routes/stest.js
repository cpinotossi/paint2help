var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  baseURLArray = req.baseUrl.split('/');
  userName = baseURLArray[baseURLArray.length-1];
  let params = {
    name: userName,
    imagePath: "/images/stest/"+userName+".png",
    layout: 'layoutsimple.hbs'
  };
  res.render('stest',params);
});

module.exports = router;