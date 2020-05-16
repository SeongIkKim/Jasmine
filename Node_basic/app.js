var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');



app.listen(3000, function() {
    console.log("start! express server on port 3000");
});

// staic 폴더 설정
app.use(express.static('public')); // public 폴더를 static 폴더로 설정한다
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

// 라우팅 middleware 사용
app.use(router); // path를 지정해주지 않으면('/')는 router 변수로 라우팅해준다.