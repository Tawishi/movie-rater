import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'

function App() {

  const [movies, setMovies] = useState([]);
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
      .then(resp => setMovies(resp))
      .catch(error => console.log(error))
  }, [])

  const loadMovie = movie => {
    setSelectedMovie(movie)
    setEditedMovie(null)

  }

  const updateMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie
      }
      return mov
    })
    setMovies(newMovies)
  }

  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  }

  const newMovie = () => {
    setEditedMovie({title:'', description:''})
    setSelectedMovie(null)
  }

  const movieCreate = movie => {
    const newMovies = [...movies, movie]
    setMovies(newMovies)
  }
  
  const removeClicked = movie => {
    const newMovies = movies.filter( mov => movie.id !== mov.id)
    setMovies(newMovies)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <div>
          <MovieList 
          movies={movies} 
          movieClicked={loadMovie} 
          editClicked={editClicked}
          removeClicked = {removeClicked}/>         
          <button onClick= {newMovie}>New Button</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        {editMovie ? <MovieForm movie={editMovie} updateMovie={updateMovie} movieCreate={movieCreate}/> : null}
        
        </div>
    </div>
  );
}

export default App;
