import { MDB_Endpoints, apiKey, baseUrl, buildQuery } from './endpoints';

/**
 * Creates the url for the call,
 * fetches the similar movies.
 * @param movieId
 */
export const getSimilarMovies = (movieId) => {
  const reqQuery = buildQuery({ api_key: apiKey }),
    url = `${baseUrl}${MDB_Endpoints.similarMovies(movieId)}?${reqQuery}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.results.map(
        ({
          id,
          title,
          poster_path: posterPath,
          backdrop_path: backdropPath,
        }) => ({
          id,
          title,
          posterPath,
          backdropPath,
        }),
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
