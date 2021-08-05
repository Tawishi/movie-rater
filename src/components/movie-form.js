import { useState } from 'react'
import {API} from '../api-service'
function MovieForm(props) {

    const [title, setTitle] = useState(props.movie.title)
    const [description, setDescription] = useState(props.movie.description)
    
    const updateClicked  = () => {        
        API.updateMovie(props.movie.id, {title, description})
        .then(resp => props.updateMovie(resp))
        .catch( error => console.log(error))
    }

    return (
        <>
        { props.movie ? (
            <div>
                <label htmlFor="title">Title</label><br/>
                <input id ="title" type="text" placeholder="title" value= {title}
                    onChange={ evt=> setTitle(evt.target.value)}
                /><br/>
                <label htmlFor="description">Description</label><br/>
                <textarea id = "description"type="text" placeholder="description" value={description}
                    onChange={ evt=> setDescription(evt.target.value)}
                /><br />
                <button onClick={updateClicked}>Update</button>
            </div>
        ) : null }
        </>
    )
}

export default MovieForm