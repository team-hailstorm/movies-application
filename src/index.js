/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, createMovie, testMovie} = require('./api.js');

$(document).ready( () => {

    //Add Movie
  $('#submit-button').on('click', function() {
    let titleValue = $('#movie-title').val();
    let ratingValue = $('#movie-rating').val();

    console.log('Movie input text: ' + titleValue + "" + ratingValue);
    // $('#movie-display').html
   createMovie({
      "title": titleValue,
      "rating": ratingValue
    });
   getMovies();
  });

  // Edit Movie
    $('#edit-button').on('click', function (e) {
        e.preventDefault();
        console.log('hello');
    });


  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    let movie = ``;
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
      movie += `
          <ul >
            <li>ID: ${id}</li>
            <li>Title: ${title}</li>
            <li>Rating: ${rating}</li>
            <form>
                <button id="edit-button">Edit</button>
                <button>Delete</button>
            </form>
          </ul>
      
      `;
    });
    $('#movie-display').html(movie);
    $('#loading').css('display', 'none');
  }).catch((error) => {
    console.log(error);
  });


});
