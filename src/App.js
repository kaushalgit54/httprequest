import "./App.css";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
   
  
 
  const fetchMovieHandler = useCallback(async()=> {
    setIsLoading(true);
    setError(null);
    try{
    const response = await fetch(`https://react-httprequest-65f39-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json`);
    
    if(!response.ok){
      throw new Error('Something went wrong');
    }
    const data = await response.json();
    //To work with the custom database and push the data in that make an array of objects and then puch all those objects
     const loadedMovies = [];
     for(const key in data){
      loadedMovies.push({
        id:key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
      })
     }
     //uncomment the below code when star wars api to be fetched
        // const transformMovies = data.results.map((movieData) => {
        //   return {
        //     id: movieData.episode_id,
        //     title: movieData.title,
        //     openingText: movieData.opening_crawl,
        //     releaseDate: movieData.release_date,
        //   };
        // });
        setMovies(loadedMovies);
        setIsLoading(false);
      }catch(error){
       setError(error.message);
      }
      setIsLoading(false);
    },[]);
   
    useEffect(()=>{
      fetchMovieHandler();
    },[fetchMovieHandler]);
    
    async function addMovieHandler(movie){
      const response = await fetch(`https://react-httprequest-65f39-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json`,{
         method: 'POST',
         body: JSON.stringify(movie),
         headers:{
          'content-type':'application/json'
         }
        });
         const data = response.json();
         console.log(data);
         
    }
    let content = <p>Found no movies</p>;
    if(movies.length>0){
      content = <MovieList movies={movies}/>;
    }
    if(error){
     content = <p>{error}</p>;
    } 
     if(isLoading){
      content = <p>Loading.......</p>;
    }
    
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fectch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
