import { MovieTrailer } from '../../types';
import { MDB_Endpoints, apiKey, baseUrl, buildQuery } from '../endpoints';

/**
 * Creates the url for the call,
 * fetches the movie trailer.
 * @param movieId
 */
export const getMovieTrailer = (movieId: number) => {
  const reqQuery = buildQuery({ api_key: apiKey }),
    url = `${baseUrl}${MDB_Endpoints.movieTrailer(movieId)}?${reqQuery}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.results
        .map(({ video, key, site }: MovieTrailer) => ({ video, key, site }))
        .slice(0, 1);
    })
    .catch((error) => {
      console.log(error);
    });
};
