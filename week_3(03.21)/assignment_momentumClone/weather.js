const weather = document.querySelector(".js-weather");

const API_KEY = "609465613fa6f9338f7864aac4fe3c7e";
const COORDS = "coords";

// js를 이용해 새로고침없이도 API로부터 얻은 데이터를 보여주기.
function getWeather(lat,lon){
    // fetch함수는 데이터를 가져올 api의 url을 인자로 받고, 데이터를 가져온다
    // then함수는 데이터를 모두 가져오고 나면 실행된다.
    // then을 사용하지 않으면 원하는 정보가 들어오지 않은 상태로 다음 함수가 호출 될 가능성이 있다.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
        // json이 로드되는데에도 시간이 걸려서 then 한번 더 사용
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
    
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // js에서 같은 이름의 키와 value를 저장할 때는 한번만 써도 된다.
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("위치에 접근할 수 없습니다.")
}

function askForCoords(){
    // navigator API사용
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        // 이미 받아놓은 좌표위치가 있을 경우 openWeatherMap API를 호출한다
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();