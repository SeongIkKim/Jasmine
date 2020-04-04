import "../scss/main.scss";
// axios를? 옛날버전으로 치환해주는 모듈
import "babel-polyfill";
import axios from "axios";

const app = new Vue({
    el: "#app",
    data() {
      return {
        movieList: [],
        suggestedMovies: [],
      };
    },
    async created() {
      const response = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?sort_by=download_count"
      );
      this.movieList = response.data.data.movies;
  
    },
    methods: {
      getTrailerLink(code) {
        return `https://www.youtube.com/watch?v=${code}`;
      },
      async fetchDetails(movieId){
        const suggestionResponse = await axios.get(
            `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieId}`
        );
        console.log(suggestionResponse);
        this.suggestedMovies = suggestionResponse.data.data.movies;
        
        // // for문으로 리스트 내의 요소들을 movie로 가져온다
        // for (const movie of this.suggestedMovies){
        //     // 각각의 연관영화는 서로 불러오는데에 영향을 주지 않기 때문에 await를 빼야 속도가 빠르다.
        //     // 그러나 for문은 순차적으로 수행되므로 await를 뺀다고 해도 소용이 없다. 따라서 다른 방식을 사용한다.
        //     const detailResponse = await axios.get(
        //         `https://yts.mx/api/v2/movie_details.json?movie_id=${movie.id}`
        //     );
        //     // sugggestedMovies 내에는 download_count 정보가 없으므로, 디테일에서 download_count를 읽어와 suggestionMovies array의 내부 속성으로 긁어와 추가해준다.
        //     movie["download_count"] = detailResponse.data.data.movie.download_count;
        //     console.log(detailResponse);
        // }
        
        // 비동기적으로 처리하기 위해 map함수를 사용해서 프로미스 객체들을 담는 리스트(promises)를 하나 만든다.
        // 즉, 각각의 movie에 대해 병렬적으로 수행되는 리스트를 만들었고, 그 리스트의 요소(movie)는 동기적(async-await)로 불러와지는것이다.
        const promises = this.suggestedMovies.map(async (movie) => {
            // 여기서 await는 이 블록 내에서 detailResponse를 받아오는 axios를 먼저 실행하라고 명시해주는것임.(아래의 movie[~]코드보다.)
            const detailResponse = await axios.get(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${movie.id}`
            );
            movie["download_count"] = detailResponse.data.data.movie.download_count;
            console.log(detailResponse);
        })

        // await를 붙이면 Promise.all은 인자로 넘겨준 promises 객체들이 모두 완료될떄까지 기다린다.
        // 즉, 병렬로 진행되고 있는 movieFetch중인 객체들을 감싸는 list자체는 내부 내용물을 모두 가져오고 난 뒤 반환하겠다.
        // await를 안해주면 list 안의 movie의 내용물이 다 안받아진 상태로 넘어갈 수있다.
        await Promise.all(promises);

        
      },
    },
  });