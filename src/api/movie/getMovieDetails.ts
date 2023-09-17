import { Movie, MovieDetails } from '../../types';
import { MDB_Endpoints, apiKey, baseUrl, buildQuery } from '../endpoints';

/**
 * Creates the url for the call,
 * fetches the movie details.
 * @param movieId
 */
export const getMovieDetails = (movieId: number) => {
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
      }: Movie): MovieDetails => ({
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
