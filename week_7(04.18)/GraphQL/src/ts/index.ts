import axios from "axios";
import "../scss/main.scss";

const MOVIE_LIST_URL = "https://yts.mx/api/v2/list_movies.json";
const GRAPHQL_URL = "http://192.168.0.28:4000/graphql";

/* 1. GraphQL 호출방법 */
const fetchPeople = async () => {
  const peopleQuery: string = `{
    people {
      name,
      age,
      gender,
      address
    }
  }`;

  const {
    data: {
      data: { people },
    },
  } = await axios.post(GRAPHQL_URL, { query: peopleQuery });
  console.log("Success Fetch People");
  console.log(people);
  console.log(`${"-".repeat(79)}\n`);
};
fetchPeople();
/* end: 1 */
//

/* 2. Rest API 호출시 결과 확인 */
const restFetchMovies = async () => {
  try {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(MOVIE_LIST_URL);
    console.log("Success Fetch Movies Using REST API");
    console.log(movies);
    console.log(`${"-".repeat(79)}\n`);
  } catch (error) {
    console.log(error);
  }
};
restFetchMovies();

/* end: 2 */
//

/* 3. GraphQL을 사용해 원하는 값만 받아오기 */
const fetchMovies = async () => {
  const query: string = `{
    movies {
      title,
      rating,
    }
  }`;

  const {
    data: {
      data: { movies },
    },
  } = await axios.post(GRAPHQL_URL, { query });
  console.log("Success Fetch Moives Using GraphQL");
  console.log(movies);
  console.log(`${"-".repeat(79)}\n`);
};
fetchMovies();
/* end: 3 */
//

/* 4. 여러개의 쿼리를 한번에 호출하기 */
const fetchMixture = async () => {
  const query: string = `{
    movie(id: 8462) {
      title,
      rating,
    },
    person(id: 12) {
      name,
      age,
      gender
    }
  }`;

  const {
    data: {
      data: { movie, person },
    },
  } = await axios.post(GRAPHQL_URL, { query });
  console.log("Success Fetch Mixture");
  console.log(movie);
  console.log(person);
  console.log(`${"-".repeat(79)}\n`);
};
fetchMixture();
/* end: 4 */