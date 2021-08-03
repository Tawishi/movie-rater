import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props) {

    const movie = props.movie

    return (
        <div>
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
                </div>
            ): null }  
        </div>
    )
}

export default MovieDetails
