import { nowPlayingMovies, storeMovieGenres } from "./js/Utils.js";
import { infiniteScroll, searchDelay } from "./js/UI-Handlers.js";

window.addEventListener('load',storeMovieGenres);
window.addEventListener('load',nowPlayingMovies);
window.addEventListener('scroll', infiniteScroll);

const searchButton = document.getElementById('searchForMovies');
searchButton.addEventListener('keyup',searchDelay);
