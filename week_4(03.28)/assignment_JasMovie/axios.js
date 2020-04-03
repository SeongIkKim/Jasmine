const example = async () => {
    try {
      const response = await axios.get(
        //"https://yts.mx/api/v2/movie_suggestions.json?movie_id=10"
        "https://yts.mx/api/v2/list_movies.json?limit=30&minimum_rating=5&genre=Drama&sorted_by=like_count&with_rt_ratings=true"
      );
      console.log(response.data);
  
      const movies = response.data.data.movies;
      console.log(movies);
    } catch (error) {
      console.log(error);
    }
  };
  
  example();