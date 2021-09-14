var express = require('express');
var router = express.Router();

const fs = require('fs');

var baseImageURL = "/images/user/";
var baseImageDir = "./public"+baseImageURL;

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
  if(req.baseUrl == ""){
    userName = "index";
  }else{
    baseURLArray = req.baseUrl.split('/');
    userName = baseURLArray[baseURLArray.length-1];
  }
  const dir = baseImageDir+userName;
  const imageList = fs.readdirSync(dir);
  imageListModified = imageList.map(function (filename){
    return baseImageURL+userName+"/"+filename
  })
  let params = {
    imageList: imageListModified,
    name: userName,
    rootPath: baseImageURL+userName+"/",
    bgcolor: process.env.BGCOLOR,
    title: process.env.TITLE
  };

  res.render('user', params);
});

module.exports = router;