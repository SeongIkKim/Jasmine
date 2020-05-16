var express = require('express');
var router = express.Router(); // router 객체를 생성한다.
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
router.post('/form', function(req,res){
    console.log(req.body.email); 
    res.render('email.ejs', {'email' : req.body.email});
});

router.post('/ajax', function(req,res){ 
    var email = req.body.email;
    var responseData = {};

    var query = connection.query('select name from user where email="' + email +'"', function(err, rows){ // mysql 쿼리처리
        if(err) throw err; 
        if(rows[0]){
            responseData.result = "ok";
            responseData.name = rows[0].name;
        } else {
            responseData.result = "none"; 
            responseData.name = "";
        }
        res.json(responseData);
    })
})

module.exports = router;