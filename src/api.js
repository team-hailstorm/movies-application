const testMovie = {
  "title": "The Other Test Movie",
      "rating": "3",

};

module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },



    createMovie: () => {
      fetch("/api/movies", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testMovie),
      })
          .then( response => response.json() )
          .then( data => console.log(data) )
          .catch( error => console.error(error));
    }


};
