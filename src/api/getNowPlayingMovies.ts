import { MDB_Endpoints, apiKey, baseUrl, buildQuery, pageToLoad } from '.';
import { moviesTemplate } from '../templates/movies';
import { mapMovieData } from '../utils';

/**
 * Creates the url for the call,
 * fetches the now playing movies
 * and then calls the moviesTemplate function.
 */
export const getNowPlayingMovies = () => {
  const query = buildQuery({ api_key: apiKey, page: pageToLoad.value }),
    url = `${baseUrl}${MDB_Endpoints.nowPlaying}?${query}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      pageToLoad.value = data.page + 1;

      const nowPlayingMovies = data.results.map(mapMovieData);
      moviesTemplate(nowPlayingMovies);
    })
    .catch((error) => {
      console.log(error);
    });
};
