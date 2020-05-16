var express = require('express');
var router = express.Router(); // router 객체를 생성한다.
var path = require('path'); // 상대경로로 쉽게 이동할 때 사용하는 모듈

// url routing
router.get('/', function(req,res){
    console.log('main.js loaded');
    res.sendFile(path.join(__dirname, "../public/main.html")); //현재경로에서 한단계 윗 경로로 올라가 public 폴더로 들어간다.
});

module.exports = router; // main.js가 router 객체에 의해 모듈화 되어 앞으로 다른 js파일에서도 이 라우터 파일에 접근할 수 있다.