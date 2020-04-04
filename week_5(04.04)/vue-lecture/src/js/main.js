import "../scss/main.scss";
// axios를? 옛날버전으로 치환해주는 모듈
import "babel-polyfill";
import axios from "axios";

/*
Movie API

영화 리스트
https://yts.mx/api/v2/list_movies.json

영화 상세 정보
https://yts.mx/api/v2/movie_details.json?movie_id=

관련 영화 정보
https://yts.mx/api/v2/movie_suggestions.json?movie_id=
*/

/*
Youtube Link
https://www.youtube.com/watch?v=
*/

// ###영화 리스트 가져오기
/*
방법 1. then-catch 구문 사용
*/

// async -> 함수 내부를 동기적으로 실행할 수 있게 준비시키는 명시 키워드
const fetchMovieList1 = async () => {
    let movieList;
    // await -> 해당 비동기처리 부분을 동기적으로 처리하겠다는 명시 키워드
    await axios
        .get("https://yts.mx/api/v2/list_movies.json")
        .then(response => {
            console.log('1');
            movieList = response.data.data.movies;
            console.log(movieList);

        }).catch((error) => {
            // 오류가 발생했을 때 잡아줄 catch구문이 없으면 프로그램이 터진다.
            console.log(error);
        });

    // asynch + await로 axios가 아래 코드보다 먼저 실행(동기처리)되었기 때문에 movieList가 정상적으로 출력된다.
    console.log('2');
    console.log(movieList);
}

// then 바깥에 있을 때, javascript는 비동기적이기 때문에 then구문이 완전히 실행되기 전에 아래 코드가 실행된다.
// 따라서 movieList는 정의되지 않은 채 호출되어 undefined가 뜬다.
// console.log('2');
// console.log(movieList);

// fetchMovieList1();


/*
방법 2. then-catch 사용 대신 try-catch를 사용

코드가 직관적이다.
then-catch는 비동기 처리과정에서 난 에러만 잡아주지만, try-catch는 try문의 모든 실행에서 난 에러를 잡아준다.
*/

const fetchMovieList = async () => {
    try {
        const repsone = await axios.get("https://yts.mx/api/v2/list_movies.json");
        const movieList = response.data.data.movies;
        console.log(movieList);
    }
    catch (error) {
        console.log(error);
    }
}
// fetchMovieList();



/// ### 연관영화 가져오기

/*
방법 1. async사용 안하고 promise chaining하기
*/

const fetchMovieDetail1 = () => {
    // promise chaining 중 then의 depth 같게하기
    axios
        .get("https://yts.mx/api/v2/list_movies.json")
        .then((response) => {
            console.log("Movie list");
            console.log(response);
            const movieList = response.data.data.movies;

            // then 내에서 호출한 axios의 값을 then 전체의 리턴값으로 넘겨준다. (이후 사용될 then에 리턴값이 넘어간다)
            return axios
                .get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieList[0].id}`);
        })
        .then((response) => {
            console.log("Movie suggestion list");
            console.log(response);
            const movies = response.data.data.movies;

            return axios
                .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${movies[0].id}`);
        })
        .then((response) => {
            console.log("Detail of first suggested movie");
            console.log(response);
        })
        .catch((error) => {
            // 원래 error 종류 명시해서 처리해야함.
            console.log(error);
        })
};

const fetchMovieDetail2 = async () => {
    try {
         // promise chaining 중 then의 depth 같게하기
    const listResponse = await axios
    .get("https://yts.mx/api/v2/list_movies.json");

    console.log("Movie list");
    console.log(listResponse);
    const movieList = listResponse.data.data.movies;

    const suggestionResponse = await axios.get(
        `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieList[0].id}`
        );
    console.log("Movie suggestion");
    console.log(suggestionResponse);
    const movies = listResponse.data.data.movies;

    const detailResposne = await axios.get(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${movies[0].id}`
        );
    console.log("Movie detail");
    console.log(detailResposne);
    }
    catch(error){
        console.log(error);
    }
   
};

fetchMovieDetail2();