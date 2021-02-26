const express = require('express');
const cheerio = require('cheerio');
// const {connectSite} = require('./selenium');

var router = express.Router();
// let list = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  // if(list == null) {
  //   connectSite().then(data => {
  //     list = data;
  //   });
  // } 

  res.render('index', {msg: "hello"});
  
  
});

module.exports = router;
