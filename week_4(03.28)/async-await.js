const example = () => {
    axios.get("https://api.hnpwa.com/v0/news/1.json").then(response => {
      console.log(response.data);
      console.log("API 호출 종료!");
    });
      console.log("프로그램 종료!");
  };
  
example();


// 출력 순서는 프로그램종료 -> API 호출 종료.

/* 
동기 처리하도록 async와 await를 사용하기
 */

const example = async () => { // 비동기 처리(ex-axios)를 감싸고 있는 함수에 async를 붙여준다.
    await axios.get("https://api.hnpwa.com/v0/news/1.json") // 비동기 처리 호출부에 await를 붙여준다.
          .then(response => {
          console.log(response.data);
          console.log("API 호출 종료!");
          return response.data;
        });
    console.log("프로그램 종료!");
  };
  
example();

// 이렇게 경우 API 호출 종료 -> 프로그램 종료 순으로 간다.
// async()의 함수블록 내부는 동기적으로 처리될 준비를 마쳤다는 뜻이고, await를 모두 수행 한 뒤 다음 코드로 넘어가라는 뜻이다.


/* 
 try-catch로 예외처리 하기

 then-catch가 비동기 처리와 관련된 오류만 잡아줄 수 있는 반면, try catch는 모든 에러를 잡아 줄 수 있다.
 */
const example = async () => {
    try {
      const response = await axios.get("https://api.hnpwa.com/v0/news/1.json");
      console.log(response.data);
      console.log("API 호출 종료!");
      console.log("프로그램 종료!");
    } catch (error) {
      console.log(error);
    }
  };
  
// example();



/* 
try catch 구문을 이용하여 중첩 호출하기

async로 전체 함수 블록을 감싸주고 비동기처리 호출부인 axios마다 앞에 await를 붙여준다.
이렇게 할 경우 순서대로 코드가 수행되어 원하는 대로 데이터가 출력된다.
*/
const fetchNewsInfo = async () => {
    try {
        const newsList = await axios.get("https://api.hnpwa.com/v0/news/1.json");
        console.log("News Call");
        console.log(newsList.data);

        const newsDetail = await axios.get(
        `https://api.hnpwa.com/v0/item/${newsList.data[0].id}.json`
        );
        console.log("News Item Call");
        console.log(newsDetail.data);

        const user = await axios.get(
        `https://api.hnpwa.com/v0/user/${newsDetail.data.user}.json`
        );
        console.log("User Call");
        console.log(user.data);
        } catch (error) {
            console.log(error);
        }
    };
fetchNewsInfo();