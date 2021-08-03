import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props) {

    const [ highlighted, setHighlighted]  = useState(-1)
    const movie = props.movie

    const highlightRate = high => evt => {
        setHighlighted(high)
    }

    const rateClicked = rate => evt => {
        // send message to API
        fetch(`http://ed2e0bbe7728.ngrok.io/api/movies/${movie.id}/rate_movie/`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Token 29efed2719a4a9f3f13f3ff253c744066063eb4e'
        },
            body: JSON.stringify( {stars : rate + 1} )
        })
        .then( () => getDetails())
        .catch(error => console.log(error))
    }

    const getDetails = () => {
        fetch(`http://ed2e0bbe7728.ngrok.io/api/movies/${movie.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Token 29efed2719a4a9f3f13f3ff253c744066063eb4e'
      }
    }).then(resp => resp.json()) //converting response to json
      .then(resp => props.updateMovie(resp))
      .catch(error => console.log(error))
  }

    return (
        <React.Fragment>
            { movie ? (
                <div>
                    <h1>{movie.title}</h1>
                    <p>{movie.description}</p>
                    <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 0 ? "orange" : ''}/>
                    <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 1 ? "orange" : ''}/>
                    <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 2 ? "orange" : ''}/>
                    <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 3 ? "orange" : ''}/>
                    <FontAwesomeIcon icon={faStar} className={movie.avg_ratings > 4 ? "orange" : ''}/>
                    ({movie.number_of_ratings})

                    <div className="rate-container">
                    <h2>Rate it</h2>
                    { [...Array(5)].map( (e, i) => {
                        return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? "yellow" : ''}
                            onMouseEnter={highlightRate(i)}
                            onMouseLeave={highlightRate(-1)}
                            onClick={rateClicked(i)}
                        />

                    })

                    }
                    </div>

                </div>
                
                
            ): null }  
        </React.Fragment>
    )
}

export default MovieDetails
