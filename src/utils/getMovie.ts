import { getSimilarMovies } from '../api';
import {
  getMovieDetails,
  getMovieReviews,
  getMovieTrailer,
} from '../api/movie';
import { modalContent } from '../templates/modalContent';
import { MovieApiResponse } from '../types';

/**
 * Gets all the required movie data we want to show to the user,
 * then calls createModalContent and appends the result
 * @param id
 */
export const getMovie = (id: number) => {
  const modal = document.getElementById(
    'movieDetailsModal',
  ) as HTMLDialogElement;
  const selectedMovie = document.getElementById(
    'selectedMovie',
  ) as HTMLDivElement;

  return () => {
    Promise.all([
      getMovieDetails(id),
      getMovieTrailer(id),
      getMovieReviews(id),
      getSimilarMovies(id),
    ])
      .then((data: MovieApiResponse) => {
        selectedMovie.innerHTML = modalContent(data);
        modal.classList.add('showModal');
      })
      .catch((error) => console.log(error));
  };
};
