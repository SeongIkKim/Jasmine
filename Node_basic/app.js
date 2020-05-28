var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var cors = require('cors');


app.listen(3000, function() {
    console.log("start! express server on port 3000");
});

// staic 폴더 설정
app.use(express.static('public')); // public 폴더를 static 폴더로 설정한다

// 미들웨어 사용
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.set('view engine','ejs');

app.use(session({
    secret : "keyboard cat",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 라우팅 middleware 사용
app.use(router); // path를 지정해주지 않으면('/')는 router 변수로 라우팅해준다.