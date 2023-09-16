import { getSimilarMovies } from '../api';
import {
  getMovieDetails,
  getMovieReviews,
  getMovieTrailer,
} from '../api/movie';
import { modalContent } from '../templates/modalContent';

/**
 * Gets all the required movie data we want to show to the user,
 * then calls createModalContent and appends the result
 * @param id
 */
export const getMovie = (id) => {
  const modal = document.getElementById('movieDetailsModal');
  const selectedMovie = document.getElementById('selectedMovie');

  return () => {
    Promise.all([
      getMovieDetails(id),
      getMovieTrailer(id),
      getMovieReviews(id),
      getSimilarMovies(id),
    ])
      .then((data) => {
        selectedMovie.innerHTML = modalContent(data);
        modal.classList.add('showModal');
      })
      .catch((error) => console.log(error));
  };
};
