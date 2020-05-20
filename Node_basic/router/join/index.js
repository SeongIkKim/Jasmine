var express = require('express');
var router = express.Router(); // router 객체를 생성한다.
var path = require('path');
var mysql = require('mysql');

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
router.get('/', function(req,res){
    console.log('get join url');
    res.sendFile(path.join(__dirname, '../../public/join.html'));
});

router.post('/', function(req,res){
   var body = req.body;
   // form에서 input name인자로 받았던대로 접근할 수 있다
   var email = body.email;
   var name = body.name;
   var password = body.password;
   
   var sql = {email:email, name:name, password:password};
   var query = connection.query('insert into user set ?', sql,
    function(err, rows) {
        if(err) throw err;
        // insert의 결과값이 rows로 출력된다
        else res.render('welcome.ejs', {'name' : name, 'id': rows.insertId})
    })
});

module.exports = router;