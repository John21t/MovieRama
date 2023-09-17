import { MDB_Endpoints, apiKey, baseUrl, buildQuery } from '../endpoints';

/**
 * Creates the url for the call,
 * fetches the movie reviews.
 * @param movieId
 */
export const getMovieReviews = (movieId) => {
  const reqQuery = buildQuery({ api_key: apiKey }),
    url = `${baseUrl}${MDB_Endpoints.movieReviews(movieId)}?${reqQuery}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.results.map(({ id, author, content }) => ({
        id,
        author,
        content,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};
