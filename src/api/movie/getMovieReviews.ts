import { MovieReview } from '../../types';
import { MDB_Endpoints, apiKey, baseUrl, buildQuery } from '../endpoints';

/**
 * Creates the url for the call,
 * fetches the movie reviews.
 * @param movieId
 */
export const getMovieReviews = (movieId: number) => {
  const reqQuery = buildQuery({ api_key: apiKey }),
    url = `${baseUrl}${MDB_Endpoints.movieReviews(movieId)}?${reqQuery}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.results.map(({ id, author, content }: MovieReview) => ({
        id,
        author,
        content,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};
