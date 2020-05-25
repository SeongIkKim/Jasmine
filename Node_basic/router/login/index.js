var express = require('express');
var router = express.Router(); // router 객체를 생성한다.
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// DATABASE SETTING
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'asdf1234',
    database : 'basic'
});

connection.connect();
// URL ROUTING
// 같은 url이라도 get으로 접근하느냐, post로 접근하느냐에 따라 routing처리가 달라진다.
router.get('/', function(req, res){
    var msg;
    var errMsg = req.flash('error') //에러 메시지는 flash로 넘어온다
    if(errMsg) msg = errMsg;
	res.render('login.ejs', {'message': msg}); // ejs 템플릿에 message란 이름으로 msg 변수 내용을 전달한다
})

// passport.serialize
passport.serializeUser(function(user,done){
    console.log('passport session save : ',user.id)
    done(null, user.id)
})

passport.deserializeUser(function(id,done){
    console.log('passport session get id: ',id)
    done(null,id);
})

/* passport strategy, callback 함수 작성 */
passport.use('local-login', new LocalStrategy({
    usernameField: 'email', // ejs의 form에서 전달받은 input name값을 입력해준다
    passwordField: 'password',
    passReqToCallback : true
},function(req, email, password, done){
    //인증 처리
    var query = connection.query('select * from user where email=?',[email],function(err,rows) {
        if(err) return done(err);   //error있으면 err있다고 보냄
        if(rows.length){  //이미 email이 DB에 있으면 중복 방지
            console.log('exsisted user')
            return done(null, false, {message: 'your email is alread used'}) // false일때 flash를 이용해 message를 전달한다
        }else{
            var sql = {email:email, password:password};
            var query = connection.query('insert into user set ?', sql, function(err, rows){
                if(err) throw err
                return done(null, {'email': email, 'password': password, 'id': rows.insertId})
            })
        }
    })
}
));

// pasport 라우팅 처리
router.post('/',passport.authenticate('local-join', {
    //원래는 callback함수 자리지만, object literal로 표현해도 authenticated method가 콜백함수처럼 동작
    successRedirect: '/main',   //성공시 해당 위치로 라우팅
    failureRedirect: '/join',   //사용자 이미 있을 시 해당 위치로 라우팅
    failureFlash: true 
})
)

module.exports = router;