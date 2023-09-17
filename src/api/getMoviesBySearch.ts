import { moviesTemplate } from '../templates/movies';
import { mapMovieData } from '../utils';
import {
  MDB_Endpoints,
  apiKey,
  baseUrl,
  buildQuery,
  pageToLoad,
  previousSearchBarValue,
} from './endpoints';
import { getNowPlayingMovies } from './getNowPlayingMovies';

const getMoviesBySearch = (value: string) => {
  const loader = document.getElementById('loader') as HTMLDivElement;
  const reqQuery = buildQuery({
      api_key: apiKey,
      query: value,
      page: pageToLoad.value,
    }),
    url = `${baseUrl}${MDB_Endpoints.searchMovies}?${reqQuery}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const moviesRetrieved = data.results.map(mapMovieData);
      moviesTemplate(moviesRetrieved);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loader.classList.remove('showLoader');
    });
};

/**
 * Implements the search bar functionality
 * Fetches the movies based on the search value,
 * then calls the moviesTemplate function.
 *
 * Resets page count for every new search - clears the previous movies
 * If search value is empty - calls getNowPlayingMovies function
 * @param value
 */
export const searchForMovies = (value: string) => {
  const moviesList = document.getElementById('movies') as HTMLDivElement;
  const loader = document.getElementById('loader') as HTMLDivElement;

  loader.classList.add('showLoader');

  if (value) {
    // Reset page count and clear movies
    if (value !== previousSearchBarValue.value) {
      moviesList.innerHTML = '';
      previousSearchBarValue.value = value;
      pageToLoad.value = 1;
    } else pageToLoad.value++;

    getMoviesBySearch(value);
  } else {
    moviesList.innerHTML = '';
    getNowPlayingMovies();
    loader.classList.remove('showLoader');
  }
};
