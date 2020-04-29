/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, createMovie, editMovie} = require('./api.js');

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

// getMovies - creates html structure for movie listings
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
             <button class="edit-info" data-id="${title}">Edit</button>
                <button class="save-button" data-id="${id}">Save</button>
                <button>Delete</button>
            </form>
            <div class="edit-info"></div>
      `;


        $('#movie-display').html(movie);
        $('#loading').css('display', 'none');
          $('.save-button').on('click', function (e) {
              e.preventDefault();
              let idMovie = $(this).attr('data-id');
              // editMovie(movieObj, id);

    console.log($(this).attr('data-id'));
    });

          $('.edit-info').on('click', function (e) {
                e.preventDefault();

              let titleMovie = $(this).attr('data-id');

              console.log(titleMovie);
                $(this).parent().next().html(`<input type="text" value="${titleMovie}" >
                                       <select id="movie-rating">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>`);


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
