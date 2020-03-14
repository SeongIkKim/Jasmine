console.log('jasmine')

var a = 1; // 가변적
const b = 1; // 불변적
let c = 1; // 이것도 변수선언법 (var이랑 차이는 알아볼것)

// 삼항 연산자
var test = ( 1 == 2 ) ? true : false;
console.log(test);
console.log(test.toString());

// 형변환
var num = "1";
console.log(num);
console.log(parseInt(num));

// switch문 사용법

var switchVar = 100;
switch (switchVar) {
    case 100:
        console.log("100입니다.");
        //break를 안써주면 아래에 있는 case까지 다 실행된다
        break;
    case 200:
        console.log("200입니다.");
        break;
    default:
        console.log("no");
}

/*
코드 네이밍 컨벤션
jas_mine : python 스네이크케이스
jasMine : js 카멜케이스
JasMine
jas-mine : css 케밥케이스
*/