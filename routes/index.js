var express = require('express');
var router = express.Router();

const fs = require('fs');


// list all files in the directory
function getImageList(dir) {
  fs.readdirSync(dir, (err, files) => {
    if (err) {
      throw err;
    }
    return files;
  });
}

/* GET home page. */
router.get('/', function (req, res, next) {
  // directory path
  const dir = './images';

  const imageList = fs.readdirSync(dir);
  var imageListFiltered = imageList.filter(function (filename)
    {
      //^.*[^.]{5}$
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
      //return fruit !== "kiwi"
    });
    
  let params = {
    imageList: imageListFiltered,
    name: "Welcome",
    rootPath: "/",
    bgcolor: process.env.BGCOLOR,
    title: process.env.TITLE
  };

  res.render('index', params);
});

module.exports = router;