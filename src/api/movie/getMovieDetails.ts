import { MDB_Endpoints, apiKey, baseUrl, buildQuery } from '../endpoints';

/**
 * Creates the url for the call,
 * fetches the movie details.
 * @param movieId
 */
export const getMovieDetails = (movieId) => {
  const reqQuery = buildQuery({ api_key: apiKey }),
    url = `${baseUrl}${MDB_Endpoints.movieDetails(movieId)}?${reqQuery}`;

  return fetch(url)
    .then((res) => res.json())
    .then(
      ({
        id,
        title,
        overview,
        vote_average: voteAvg,
        vote_count: voteCount,
      }) => ({
        id,
        title,
        overview,
        voteAvg,
        voteCount,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};
