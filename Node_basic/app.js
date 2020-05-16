var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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
    /* 3. server에서 데이터 처리 후 다시 html로 반환 */
    console.log(req.body.email); // ajax로 받은 json 객체의 email 값이 서버에 로그로 찍힌다.
    // check validation about input data => select DB // 받은 데이터가 올바른 값인지 확인하고, DB에 정보를 넣거나 빼오는 과정이 여기에 들어간다.
    var responseData = {'result' : 'ok', 'email' : req.body.email};
    res.json(responseData); // 가공해서 만든 json형태의 responsedata를 html파일로 다시 넘긴다.
})