import React, { useState } from 'react';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);

 async function fetchMovieHandler() {
  setIsLoading(true)
   const response= await fetch('https://swapi.dev/api/films')

      const data= await response.json();
       const transformedData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setIsLoading(false);
        setMovies(transformedData);

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
         {!isLoading && movies.length>0 && <MovieList movies={movies} />}
         {!isLoading && movies.lengtn==0 && <p>Found no movies</p>}
         {isLoading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;