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
  //   $('ul').on('click', function (e) {
  //       e.preventDefault();
  //       console.log('hello');
  //   });


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
             </ul>
            <form>
                <button class="edit-button" data-id="${id}">Edit</button>
                <button>Delete</button>
            </form>
         
      
      `;
        $('#movie-display').html(movie);
        $('#loading').css('display', 'none');
          $('.edit-button').on('click', function (e) {
              e.preventDefault();


    console.log($(this).attr('data-id'));
    });
    // $('#movie-display').html(movie);
    // $('#loading').css('display', 'none');
    //   $('ul').on('click', function (e) {
    //       e.preventDefault();
    //       console.log(this.children[0]);
      });
  }).catch((error) => {
    console.log(error);
  });


});
