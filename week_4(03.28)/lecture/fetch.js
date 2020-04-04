fetch("https://api.hnpwa.com/v0/news/1.json") // 이 fetch는 URL주소에 요청한 결과를 바로 반환하지 않는다. 대신에 요청한 결과를 가져올 promise객체(일반 HTTP Response)를 반환한다.
  .then(response => { // 이 시점의 then은 promise 객체를 가져오는것을 완료(resolved)하였을때 진행된다.
    // 그러나 promise 객체는 응답을 아직 받아오지 못했으므로(async 상태), promise의 상태는 pending(대기중)으로 나온다.
    // console.log(response.json());
    return response.json();
  })
  .then(response => { // response.json()에서 fulfilled 또는 rejected된 응답(Promise가 아님)을 받아왔다. 이것이 우리가 원하던 'URL에서 응답받은 데이터'이다.
    // console.log("fetch API call");
    // console.log(response);
    // console.log("fetch End");
  })
  .catch(error => {
    console.log(error);
  });
// console.log("프로그램 종료"); // 이 log가 위의 fetch log보다 먼저 실행된다.(then이하의 블록들은 주소에서 응답을 받아오고있기때문에-async- 아래의 코드를 먼저 실행한다)

/*
fetch도 promise를 반환하기 때문에 then을 이용한 chaining이 가능하다.
그러나 fetch는 바로 json 타입으로 반환하는 것이 아니라 Http Response이기때문에, json으로 바꿔주는 구문까지 포함되어 두배로 늘어난다.
*/
fetch("https://api.hnpwa.com/v0/news/1.json")
  .then(response => {
    return response.json();
  })
  .then(response => {
    console.log("News Call");
    console.log(response);
    return fetch(`https://api.hnpwa.com/v0/item/${response[0].id}.json`);
  })
  .then(response => {
    return response.json();
  })
  .then(response => {
    console.log("News Item Call");
    console.log(response);
    return fetch(`https://api.hnpwa.com/v0/user/${response.user}.json`);
  })
  .then(response => {
    return response.json();
  })
  .then(response => {
    console.log("User Call");
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });