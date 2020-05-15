var express = require('express');
var app = express();
app.listen(3000, function() {
    console.log("start! express server on port 3000");
});

// staic 폴더 설정
app.use(express.static('public')) // public 폴더를 static 폴더로 설정한다

// url routing
app.get('/', function(req,res){
    res.sendFile(__dirname + "/public/main.html");
});