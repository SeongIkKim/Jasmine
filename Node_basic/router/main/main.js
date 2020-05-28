var express = require('express');
var router = express.Router(); // router 객체를 생성한다.
var path = require('path'); // 상대경로로 쉽게 이동할 때 사용하는 모듈

//main page 는 login이 될 때만(즉 세션정보가 있을때만) 접근이 가능하게 하자.
router.get('/', function(req,res) {
	var id = req.user;
	if(!id) res.render('login.ejs');
	res.render('main.ejs', {'id' : id});
});

module.exports = router; // main.js가 router 객체에 의해 모듈화 되어 앞으로 다른 js파일에서도 이 라우터 파일에 접근할 수 있다.