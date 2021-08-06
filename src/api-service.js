export class API {

    static loginUser(body) {
        return fetch(`https://471c462111d2.ngrok.io/auth/`, {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static updateMovie(movie_id, body, token) {
    return fetch(`https://471c462111d2.ngrok.io/api/movies/${movie_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify (body)
    }).then(resp => resp.json())
  }

  static createMovie(body, token) {
    return fetch(`https://471c462111d2.ngrok.io/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify (body)
    }).then(resp => resp.json())
  }

  static deleteMovie(movie_id, token) {
    return fetch(`https://471c462111d2.ngrok.io/api/movies/${movie_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Token ${token}`
      }
    })
  }

}