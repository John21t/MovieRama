import { getMovie } from '../utils';
import { MappedMovies } from '../types';
import { movieTemplate } from './movie';
import { noResultsFoundTemplate } from './noResultsFound';

/**
 * Appends the movie templates to the movie list
 * If movies doesn't exist,
 * returns the No Results Found template
 * @param movies
 */
export const moviesTemplate = (movies: MappedMovies) => {
  if (!movies || !movies.length) return noResultsFoundTemplate();

  const moviesList = document.getElementById('movies') as HTMLDivElement;
  for (const movie of movies) {
    const movieToShow = document.createElement('span');

    movieToShow.addEventListener('click', getMovie(movie.id));
    movieToShow.setAttribute('data-toggle', 'modal');
    movieToShow.setAttribute('data-target', '#movieDetailsModal');
    movieToShow.classList.add('movie');
    movieToShow.innerHTML = movieTemplate(movie);

    moviesList.appendChild(movieToShow);
  }
};
