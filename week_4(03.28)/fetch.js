fetch("https://api.hnpwa.com/v0/news/1.json") // 이 fetch는 URL주소에 요청한 결과를 바로 반환하지 않는다. 대신에 요청한 결과를 가져올 promise객체(일반 HTTP Response)를 반환한다.
  .then(response => { // 이 시점의 then은 promise 객체를 가져오는것을 완료(resolved)하였을때 진행된다.
    // 그러나 promise 객체는 응답을 아직 받아오지 못했으므로(async 상태), promise의 상태는 pending(대기중)으로 나온다.
    console.log(response.json());
    return response.json();
  })
  .then(response => {
    console.log("fetch API call");
    console.log(response);
    console.log("fetch End");
  })
  .catch(error => {
    console.log(error);
  });
console.log("프로그램 종료");