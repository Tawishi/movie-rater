import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'

function App() {

  const [movies, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(()=>{
    fetch("https://306c6ced25f9.ngrok.io/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Token 29efed2719a4a9f3f13f3ff253c744066063eb4e'
      }
    }).then(resp => resp.json()) //converting response to json
      .then(resp => setMovie(resp))
      .catch(error => console.log(error))
  }, [])

  const movieClicked = movie => {
    setSelectedMovie(movie)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <MovieList movies={movies} movieClicked={movieClicked}/>         
          <MovieDetails movie={selectedMovie}/>
        </div>
    </div>
  );
}

export default App;
