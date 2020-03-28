/*
querySelector는 html문서 내의 해당 선택자를 가진 첫번째 요소르 가져온다.
querySelectorAll은 html 문서내의 해상 선택자에 해당하는 모든 요소를 array로 가져온다.
(정확히 말하면 nodeList이므로 for문 또는 foreach문을 통해 반복적으로 접근할 수 있다.)
*/ 
const form = document.querySelector(".js-form"),
    input = document.querySelector("input"),
    greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_ON = "showing";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    // event가 실행되면 document까지 적용되어야 하므로 새로고침을 시도하는데, 이를 막을 것이다(preventDefault)
    // 이렇게 하면 submit를 해도 document로 내용을 적용시키는 새로고침이 일어나지 않는다.
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_ON);
    greetings.classList.add(SHOWING_ON);
    greetings.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        // 저장된 유저가 없을 때
        askForName();
    } else {
        // 저장된 유저가 있을 때
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();