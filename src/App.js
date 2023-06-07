import React, { useState,useEffect,useCallback } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryTimer, setRetryTimer] = useState(null);

  

 const fetchMovieHandler=useCallback(async()=> {
  setIsLoading(true)
  setError(null);
  try{
   const response= await fetch('https://swapi.dev/api/films/')
   if(!response.ok){
    throw new Error("Something went wrong ....Retrying!")
  }
    const data= await response.json();
      // if(!response.ok){
      //   throw new Error("Something went wrong!")
      // }
       const transformedData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        
        setMovies(transformedData);
        
      }catch(error){
        setError(error.message)
        // Retry logic
      const timer = setTimeout(fetchMovieHandler, 1000);
      setRetryTimer(timer);
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
      }
      setIsLoading(false);

 },[]);
  useEffect(()=>{
        fetchMovieHandler()
  },[fetchMovieHandler]); 

  function addMovieHandler(movie){
    console.log(movie)
  }
  // useEffect(() => {
  //   if (retryCount === 0) return; // Skip initial retry

  //   return () => {
  //     clearTimeout(retryTimer); // Clear retry timer when component unmounts
  //   };
  // }, [retryCount, retryTimer]);

  function cancelRetryHandler() {
    clearTimeout(retryTimer);
    setRetryCount(0);
  }

  let content =<p>found no movies.</p>
  if(movies.length>0){
    content=<MovieList movies={movies} />
  }
  if(error){
    content=<p>{error}</p>
  }
  if(isLoading){
    content =<p>Loading....</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHandler} disabled={isLoading}>Fetch Movies</button>
        <button onClick={cancelRetryHandler} disabled={!retryCount || isLoading}>Cancel</button>
      </section>
      <section>
         {/* {!isLoading && movies.length>0 && <MovieList movies={movies} />}
         {!isLoading && movies.length==0 && !error && <p>Found no movies</p>}
         {!isLoading && <p>{error}</p>}
         {isLoading && <p>Loading....</p>} */}
          {content}
         </section>
    </React.Fragment>
  );
}

export default App;