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