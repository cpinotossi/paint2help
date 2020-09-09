var express = require('express');
var router = express.Router();

const fs = require('fs');


// list all files in the directory
function getImageList(dir){
  fs.readdirSync(dir, (err, files) => {
    if (err) {
        throw err;
    }
    return files;
});
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // directory path
  const dir = './images/luna';

  const imageList = fs.readdirSync(dir);
  let params = {
    imageList: imageList
  };

  res.render('index', params);
});

module.exports = router;