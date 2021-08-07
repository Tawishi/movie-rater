import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token'])


  useEffect(()=>{
    fetch(`https://c2b0ca4efb2d.ngrok.io/api/movies/`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    }).then(resp => resp.json()) //converting response to json
      .then(resp => setMovies(resp))
      .catch(error => console.log(error))
  }, [token])

  useEffect( () => {
    console.log(token)
    if (!token['mr-token']) window.location.href = '/'
}, [token])

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

  const logoutUser = () => {
    // remove the token
    deleteToken(['mr-token'])
  }
  
  const removeClicked = movie => {
    const newMovies = movies.filter( mov => movie.id !== mov.id)
    setMovies(newMovies)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} /> <br />
          <span>Movie Rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/> <br />
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
