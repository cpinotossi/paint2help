var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("AI was called client side side from %s", req.baseUrl);
    let params = {
        layout: 'layoutcsai.hbs'
      };
    res.render('hw', params);
});

module.exports = router;