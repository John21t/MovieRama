import { searchForMovies } from '../api';

/**
 * Implements a delay for the search bar.
 * Clears the timer if it has already been set,
 * then makes a new one.
 * * @param {Event} event - The event parameter with an explicit type annotation.
 */
let searchDelayTimer: number | NodeJS.Timeout = 0;
export const searchDelay = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;

  clearTimeout(searchDelayTimer);
  searchDelayTimer = setTimeout(() => {
    searchForMovies(inputElement.value);
  }, 500);
};
