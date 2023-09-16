import { MDB_Endpoints, apiKey, baseUrl, buildQuery } from '../endpoints';

/**
 * Creates the url for the call,
 * fetches the movies genres,
 * stores them to the sessionStorage.
 */
export const getMovieGenres = () => {
  const query = buildQuery({ api_key: apiKey }),
    url = `${baseUrl}${MDB_Endpoints.movieGenres}?${query}`;

  fetch(url)
    .then((res) => res.json())
    .then(({ genres }) => {
      sessionStorage.setItem('genres', JSON.stringify(genres));
    })
    .catch((error) => {
      console.log(error);
    });
};
