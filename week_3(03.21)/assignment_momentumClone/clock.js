const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1"); // 태그는 앞에 식별자(#,. 등)를 붙일 필요 없다


function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds= date.getSeconds();
    // 삼항연산자 --> 10보다 작으면 앞에 0 붙이기
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
}

function init() {
    getTime();
    // 1000miliseconds마다 getTime함수를 실행
    setInterval(getTime, 1000);
}

init();