
module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },



    createMovie: (movieObj) => {
      fetch("/api/movies", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
      })
          .then( response => response.json() )
          .then( data => console.log(data) )
          .catch( error => console.error(error));
    },

  editMovie: (movieObj, id) => {
    fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieObj),
    })
        .then( response => response.json() )
        .then( data => console.log(data) )
        .catch( error => console.error(error));
  }
};
