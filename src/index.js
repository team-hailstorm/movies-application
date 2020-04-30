/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, createMovie, editMovie, deleteMovie} = require('./api.js');

$(document).ready( () => {

    //Add Movie
  $('#submit-button').on('click', function(e) {
      e.preventDefault();
      renderLoading();
    let titleValue = $('#movie-title').val();
    let ratingValue = $('#movie-rating').val();

    console.log('Movie input text: ' + titleValue + "" + ratingValue);
    // $('#movie-display').html
   createMovie({
      "title": titleValue,
      "rating": ratingValue
    });
   updateMovies();
  });

  function renderLoading () {
      $('#movie-display').html('<p>Loading<span>.</span><span>.</span><span>.</span></p>')
  }

// getMovies - creates html structure for movie listings
    function callMoviesFromJSON () {
        renderLoading();
        getMovies().then((movies) => {
            console.log('Here are all the movies:');
            let movie = ``;
            movies.forEach(({title, rating, id}) => {
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                movie += `
          <ul >
            <li class="d-none">ID: ${id}</li>
            <li>Title: ${title}</li>
            <li>Rating: ${rating}</li>
             </ul>
            <form>
             <button class="edit-info" data-id="${title}">Edit</button>
                <button class="save-button" data-id="${id}">Save</button>
                <button class="delete-button" data-id="${id}">Delete</button>
            </form>
            <div class="edit-info"></div>
      `;
                editMovieForm(movie);
                // $('#movie-display').html(movie);
                // $('#loading').css('display', 'none');
                //   $('ul').on('click', function (e) {
                //       e.preventDefault();
                //       console.log(this.children[0]);
            });
            activateSave();
            deleteButtonMovie();
        }).catch((error) => {
            console.log(error);
        });
    }

    callMoviesFromJSON();


  function activateSave () {
      $('.save-button').on('click', function (e) {
          e.preventDefault();
          let idMovie = $(this).attr('data-id');
          let movieTitle = $(this).parent().next().children().first().val();
          let ratingMovie = $(this).parent().next().children().first().next().val();
          let movieObj = {
              title: `${movieTitle}`,
              rating: `${ratingMovie}`
          };
          console.log(movieObj);
          editMovie(movieObj, idMovie);
          updateMovies();

      });
  }

  function editMovieForm (movie) {

      $('#movie-display').html(movie);
      $('#loading').css('display', 'none');
      $('.edit-info').on('click', function (e) {
          e.preventDefault();
          let titleMovie = $(this).attr('data-id');
          console.log(titleMovie);
          $(this).parent().next().html(`<input type="text" value="${titleMovie}" >
                                       <select class="movie-rating">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>`);
      });

  }

  function deleteButtonMovie () {
      $('.delete-button').on('click', function (e) {
            e.preventDefault();
            let idOfDeleteButton = $(this).attr('data-id');
            console.log(idOfDeleteButton);
            deleteMovie(idOfDeleteButton);
            updateMovies();
      });
  }

  function updateMovies() {
      callMoviesFromJSON();
  }

});
