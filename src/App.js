import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'

function App() {

  const [movies, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, setEditedMovie] = useState(null);


  useEffect(()=>{
    fetch("https://471c462111d2.ngrok.io/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Token 29efed2719a4a9f3f13f3ff253c744066063eb4e'
      }
    }).then(resp => resp.json()) //converting response to json
      .then(resp => setMovie(resp))
      .catch(error => console.log(error))
  }, [])

  const loadMovie = movie => {
    setSelectedMovie(movie)
    setEditedMovie(null)

  }

  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked}/>         
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        {editMovie ? <MovieForm movie={editMovie}/> : null}
        
        </div>
    </div>
  );
}

export default App;
