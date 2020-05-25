var express = require('express');
var router = express.Router(); 
var path = require('path');
var main = require('./main/main');
var email = require('./email/email');
var join = require('./join/index');
var login = require('./login/index');

// url routing
router.get('/', function(req,res){
    console.log('get join url');
    res.render('join.ejs');
});

// 라우팅 미들웨어를 기준으로 다시 라우팅하는 것이기 때문에, app.use가 아니라 router.use를 사용한다.
router.use('/main', main); // main.js 모듈로 라우팅해준다.
router.use('/email', email) // email.js 모듈로 라우팅해준다.
router.use('/join', join)
router.use('/login', login)

module.exports = router;