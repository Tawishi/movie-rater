const TOKEN = "29efed2719a4a9f3f13f3ff253c744066063eb4e"

export class API {
    static updateMovie(movie_id, body) {
    return fetch(`https://471c462111d2.ngrok.io/api/movies/${movie_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Token ${TOKEN}`
      },
      body: JSON.stringify (body)
    }).then(resp => resp.json())
  }

  static createMovie(body) {
    return fetch(`https://471c462111d2.ngrok.io/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Token ${TOKEN}`
      },
      body: JSON.stringify (body)
    }).then(resp => resp.json())
  }

  static deleteMovie(movie_id) {
    return fetch(`https://471c462111d2.ngrok.io/api/movies/${movie_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Token ${TOKEN}`
      }
    })
  }

}