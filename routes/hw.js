var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let params = {
        layout: 'layoutsimple.hbs'
      };
    res.render('hw', params);
});

module.exports = router;