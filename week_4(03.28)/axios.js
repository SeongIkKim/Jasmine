axios
  .get("https://api.hnpwa.com/v0/news/1.json", {
    responseType: "json" // response type은 지정해주지 않아도 json으로 설정된다. axios는 프로미스 객체를 반환하는데 json 형식으로 반환한다.
  })
  .then(response => { // 호출 성공시. fetch와는 달리 then을 두번씩 쓸 필요가 없다.
    console.log("Axios API call");
    console.log(response); // fetch, ajax와는 달리 response 객체에 데이터가 바로 담겨있지 않고, 데이터들을 넣은 data 객체를 반환해준다.
    console.log("Axios end");
  })
  .catch(error => { // 호출 실패시(error handling 파트)
    console.log(error);
  })
  .finally(() => { // 호출 결과와 관계없이 호출이 종료될 때 수행되는 코드블록
    console.log("Axios Complete");
  });


// axios에서도 콜백 지옥에 빠질 수 있다. (then 구절의 깊이가 너무 깊어지고 있다)

axios
  .get("https://api.hnpwa.com/v0/news/1.json", {
    responseType: "json"
  })
  .then(response => {
    console.log("News Call");
    console.log(response.data);
    axios
      .get(`https://api.hnpwa.com/v0/item/${response.data[0].id}.json`)
      .then(response => {
        console.log("News Item Call");
        console.log(response.data);
        axios
          .get(`https://api.hnpwa.com/v0/user/${response.data.user}.json`)
          .then(response => {
            console.log("User Call");
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });


/*
콜백 지옥 탈출 3 - Promise Chaning 이용

반환값이 Promise 객체일 때, then-catch 구문을 사용할 수 있다.
axios도 Promise based이기때문에 객체를 반환해야한다.


*/

axios
  .get("https://api.hnpwa.com/v0/news/1.json", {
    responseType: "json"
  })  // 여기서 get은 프로미스 객체를 return해준다. (return과 response는 다르다. response는 url에서 받아온 데이터이고, return은 그 데이터를 처리하여 get 메서드가 반환하는 값.)
  .then(response => {
    console.log("News Call");
    console.log(response.data);
    return axios.get(   // 위의 방법과의 차이는 블록 내에서 axios.get을 처리해서 더 깊은 depth로 들어가는게 아니라, return값으로 프로미스 객체를 다음블록으로 넘겨주도록 분리하고있다는 점.
      `https://api.hnpwa.com/v0/item/${response.data[0].id}.json`
    );
  })
  .then(response => {
    console.log("News Item Call");
    console.log(response.data);
    return axios.get(
      `https://api.hnpwa.com/v0/user/${response.data.user}.json`
    );
  })
  .then(response => {
    console.log("User Call");
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });