var EventEmitter = require("events").EventEmitter;
var evt = new EventEmitter();

evt.on("helloNode", function(str){
    console.log("Hello!" + str);
});

// setTimeout은 두번째 인자만큼의 milisecond 이후에 특정 함수를 콜백으로 실행시킨다.
setTimeout(function(){
    evt.emit("helloNode", "Node.js");
}, 3000);