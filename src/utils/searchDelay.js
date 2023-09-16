import { searchForMovies } from '../api';

/**
 * Implements a delay for the search bar.
 * Clears the timer if it has already been set,
 * then makes a new one.
 */
let searchDelayTimer = 0;
export const searchDelay = (event) => {
  clearTimeout(searchDelayTimer);

  searchDelayTimer = setTimeout(() => {
    searchForMovies(event.target.value);
  }, 500);
};
