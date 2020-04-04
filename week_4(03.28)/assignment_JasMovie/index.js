// const movieCard = document.querySelector(".movie-card"),
//     poster = movieCard.querySelector(".poster"),
//     card-body = movieCard.querySelector("")

const app = document.querySelector("#app");

const makeMovieCard = (movieDetail) => {
    const movieCard = document.createElement("div")
    movieCard.classList.add("movie-card");

    const poster = document.createElement("img");
    poster.classList.add("poster");
    poster.src = movieDetail.large_cover_image;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    const h1 = document.createElement("h1");
    const div = document.createElement("div");
    const span = document.createElement("span");
    const p = document.createElement("p");

    h1.innerText = movieDetail.title;
    movieDetail.genres.forEach(function(genre){
        const pForGenre = document.createElement("p");
        pForGenre.innerText = genre; 
        div.append(pForGenre);
    });
    p.innerText = movieDetail.description_intro;

    cardBody.appendChild(h1);
    cardBody.appendChild(div);
    cardBody.appendChild(p);

    movieCard.appendChild(poster);
    movieCard.appendChild(cardBody);

    return movieCard;
}


const mainInit = async () => {
    try {
        var response = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?limit=16&minimum_rating=5&genre=Drama&sorted_by=like_count&with_rt_ratings=true"
        );
        // console.log(response.data);
        
        // 1페이지 movie 16개 받아옴
        // 최소 5점이상, 드라마장르, 좋아요 갯수순, 로튼토마토 점수까지
        const movieList = response.data.data.movies;
        console.log(movieList);
        
        // 각 movie별로 card 만들고 정보 채워넣어 띄우기
        for(var i=0; i<movieList.length; i++){
            response = axios.get(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${movieList[i].id}&with_images=true`
            );
            const movieDetail = response.data.data.movie;
            // 최초의 movie로 만든 moviecard app에 추가
            const movieCard = makeMovieCard(movieDetail);
            // movieCard 클릭시 detail 페이지로 이동하는 이벤트 달아줌
            movieCard.onclick = function() {location.href = `./detail.html?id=${movieDetail.id}`;};
            app.appendChild(movieCard);
        }


        
    } catch (error) {
        console.log(error);
    }
};

mainInit();
