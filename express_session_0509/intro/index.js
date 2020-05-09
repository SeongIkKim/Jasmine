const express = require('express')
// 모듈을 불러오기 위해 require() 사용
const app = express()
const port = 3000
const usersRouter = require("./users.js");

/* 미들웨어를 만들어 응답을 가공해보자. */
app.use('*', (req,res,next) =>{
    console.log('자스민 짱!'); // server에 console.log가 뜬다.
    next(); // next()를 하지 않으면 다음 코드로 넘어가지 않는다. 반드시 넣어주어야 한다.
});

// 라우터 위에 미들웨어를 반드시 사용해야함. script언어라서.
// 아래는 라우터. 장고로치면 urls.py
app.get('/', (req, res) => res.send('Hello world!'))
app.use("/users", usersRouter); // router로 받아온 정보들을 사용하겠다.


/* 404 핸들링 커스텀 미들웨어 */
// 원래 미들웨어는 라우터 위에 있지만, 에러핸들링은 라우터 아래에 써준다.
// app.use('/', route);
// app.use((req, res, next) => { // 404 처리 부분(오류 처리 미들웨어는 인자 4개)
//   res.status(404).send('일치하는 주소가 없습니다!');
// });
// app.use((err, req, res, next) => { // 에러 처리 부분
//   console.error(err.stack); // 에러 메시지 표시
//   res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
// });


app.listen(port, () =>
 console.log(`Example app listening at http://localhost:${port}`)
 );

// $node index.js로 런서버