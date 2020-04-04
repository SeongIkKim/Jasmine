// 이렇게 짤 경우 콜백이 연속적으로 사용되고 코드가 유동적이지 못한 현상을 '콜백 지옥'이라고 한다.
$.ajax({
    url: "https://api.hnpwa.com/v0/news/1.json",
    type: "GET",
    dataType: "json",
    success: data => { // 뉴스 리스트 호출
      console.log("News Call");
      console.log(data);
  
      $.ajax({ // 뉴스 리스트 중 첫 번째 뉴스의 상세 정보 호출
        url: `https://api.hnpwa.com/v0/item/${data[0].id}.json`,
        type: "GET",
        dataType: "json",
        success: data => {
          console.log("News Item Call");
          console.log(data);
  
          $.ajax({ // 첫번째 뉴스의 정보 중 작성자 정보 호출
            url: `https://api.hnpwa.com/v0/user/${data.user}.json`,
            type: "GET",
            dataType: "json",
            success: data => {
              console.log("User Call");
              console.log(data);
            },
            error: error => {
              console.error(error);
            }
          });
        },
        error: error => {
          console.error(error);
        }
      });
    },
    error: error => {
      console.error(error);
    }
  });


/*
콜백 지옥 탈출 1 - 코딩 패턴 수정

호출부를 각각의 함수로 분리하여 사용한다.
Good: 코드의 깊이기 깊어지지 않는다.
Bad: 코드의 응집성과 가독성이 떨어진다.

*/
$.ajax({
    url: "https://api.hnpwa.com/v0/news/1.json",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("News Call");
      console.log(data);
  
      fetchNewsItem(data[0].id);
    },
    error: error => {
      console.error(error);
    }
  });
  
  const fetchNewsItem = newsId => {
    $.ajax({
      url: `https://api.hnpwa.com/v0/item/${newsId}.json`,
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("News Item Call");
        console.log(data);
  
        fetchUser(data.user);
      },
      error: error => {
        console.error(error);
      }
    });
  };
  
  const fetchUser = user => {
    $.ajax({
      url: `https://api.hnpwa.com/v0/user/${user}.json`,
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("User Call");
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    });
  };



/*
콜백 지옥 탈출 2 - 동기화 형태로 변경

함수를 분리하여 새로 만들지 않고, 변수에 호출 정보를 저장하고있다.
또, async:false를 사용하여 비동기방식이 아니라 동기방식으로 처리방식을 바꿨다.
따라서 위의 ajax가 수행되어 success의 콜백함수가 종료될 때까지 기다리게 된다.
success 내에서 변수를 저장해두었기 때문에 다음 ajax가 호출될 때 변수 내의 response값을 사용할 수 있게 된다.
Good
-시간순으로 코드를 작성할 수 있어 코드의 논리적 이해가 쉽다.
-각 API간의 연관성을 다소 낮출 수 있다.

*/
var newsId;
$.ajax({
  url: "https://api.hnpwa.com/v0/news/1.json",
  type: "GET",
  dataType: "json",
  async: false,
  success: data => {
    console.log("News Call");
    console.log(data);

    newsId = data[0].id;
  },
  error: error => {
    console.error(error);
  }
});

var user;
$.ajax({
  url: `https://api.hnpwa.com/v0/item/${newsId}.json`,
  type: "GET",
  dataType: "json",
  async: false,
  success: data => {
    console.log("News Item Call");
    console.log(data);

    user = data.user;
  },
  error: error => {
    console.error(error);
  }
});

$.ajax({
  url: `https://api.hnpwa.com/v0/user/${user}.json`,
  type: "GET",
  dataType: "json",
  success: data => {
    console.log("User Call");
    console.log(data);
  },
  error: error => {
    console.error(error);
  }
});