var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'asdf1234',
    database : 'basic'
});

connection.connect();

app.listen(3000, function() {
    console.log("start! express server on port 3000");
});

// staic 폴더 설정
app.use(express.static('public')); // public 폴더를 static 폴더로 설정한다
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

// url routing
app.get('/main', function(req,res){
    res.sendFile(__dirname + "/public/main.html");
});

app.post('/email_post', function(req,res){
    //get : req.param("email");
    console.log(req.body.email); // 객체가 서버로 전달되어 로그로 찍힌다.
    // res.send("<h1>Welcome!"+ req.body.email + "</h1>");
    res.render('email.ejs', {'email' : req.body.email});
});

app.post('/ajax_send_email', function(req,res){ 
    var email = req.body.email;
    var responseData = {};

    var query = connection.query('select name from user where email="' + email +'"', function(err, rows){ // mysql 쿼리처리
        if(err) throw err; // 에러처리
        if(rows[0]){
            responseData.result = "ok";
            responseData.name = rows[0].name; // 반환된 json row data에서 name값을 뽑아낸다
        } else {
            // 해당 email을 가진 user가 존재하지 않을때
            responseData.result = "none"; 
            responseData.name = "";
        }
        res.json(responseData);
        /* response 값을 주는 위의 코드는 반드시 콜백함수 내에 존재해야 한다.
        만약 콜백함수 바깥에 존재한다면 비동기로 처리되어 mysql에서 데이터를 불러오기도 전에 수행되고,
        결국 값을 제대로 불러오지 못하게 된다. */
    })
})