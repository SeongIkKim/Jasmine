// /users라는 주소에 대하여 아래의 라우터를 이용하여 url을 세분화시켜준다.
const express = require("express")
const router = express.Router(); // app(express)이 아니라 Router를 이용할것!

router.get('/', (req,res) =>{
    res.send("hi users!");
});

router.get("/js", (req,res) =>{
    res.send("hi js!");
})

// 바깥으로 router내의 내용들을 내보내주는 코드
module.exports = router;