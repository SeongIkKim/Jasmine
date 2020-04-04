const app = document.querySelector("#app");

const makeMovieCard = (movieDetail) => {
    const movieCard = document.createElement("div")
    movieCard.classList.add("movie-card");

    const poster = document.createElement("img");
    poster.classList.add("poster");
    poster.src = movieDetail.large_cover_image;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    const rating = document.createElement("span");
    const h1 = document.createElement("h1");
    const likeCount = document.createElement("div");
    const genreDiv = document.createElement("div");
    const p = document.createElement("p");
    const trailerBtn = document.createElement("button");

    rating.innerText = "Raiting : "+movieDetail.rating;
    h1.innerText = movieDetail.title+"("+movieDetail.year+")";
    likeCount.innerText = "Likes : "+movieDetail.like_count;
    movieDetail.genres.forEach(function(genre){
        const pForGenre = document.createElement("p");
        pForGenre.innerText = genre; 
        genreDiv.append(pForGenre);
    });
    p.innerText = movieDetail.description_full;
    trailerBtn.onclick = function() {location.href = `https://www.youtube.com/watch?v=${movieDetail.yt_trailer_code}`;};
    trailerBtn.innerText = "See trailer";

    cardBody.appendChild(rating);

    cardBody.appendChild(h1);
    cardBody.appendChild(likeCount);
    cardBody.appendChild(genreDiv);
    cardBody.appendChild(p);
    cardBody.appendChild(trailerBtn);

    movieCard.appendChild(poster);
    movieCard.appendChild(cardBody);

    return movieCard;
}

const detailInit = async() => {
    try {
        // 주소 파라미터에서 해당 movie의 id를 가져온다
        const movieId = location.search.split('=')[1];

        const response = await axios.get(
            `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}&with_images=true`
            );

        const movieDetail = response.data.data.movie;
        console.log(movieDetail);
        // 최초의 movie로 만든 moviecard app에 추가
        const movieCard = makeMovieCard(movieDetail);
        app.appendChild(movieCard);

    } catch {
        console.log(error);
    }

    // 첫번째 movie의 추천영화
    // 추후 for문으로 대체
    // response = await axios.get(
    //     `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieList[0].id}`
    // )
    // const movieSuggestion = response.data.data.movies;
    // console.log("moive suggestion은");
    // console.log(movieSuggestion);
}

detailInit();