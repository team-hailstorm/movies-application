"use strict";
const keys = require('./keys');

module.exports = {
    getMoviePoster: (searchText) => {
        movieTitle = searchText;
         fetch(`http://www.omdbapi.com?s=${searchText}&apikey=${keys.OMBD_KEY}`).then(response => { return response.json().then( data => {
            console.log(data)
            let title = data.Search[0].title;
             let poster = data.Search[0].Poster;
             return poster;
        }); } )
            .catch( error => console.log(error) );
    },
}






