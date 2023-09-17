import { getMovieGenres } from './api/movie';
import { infiniteScroll, searchDelay } from './utils';

window.addEventListener('load', getMovieGenres);
infiniteScroll();

const searchInput = document.getElementById(
  'searchForMovies',
) as HTMLInputElement;
searchInput.addEventListener('keyup', searchDelay);

// Modal elements
const modal = document.getElementById('movieDetailsModal') as HTMLDialogElement;
const modalContent = document.getElementById(
  'movieModalContent',
) as HTMLDivElement;
const modalClose = document.getElementById(
  'movieModalClose',
) as HTMLButtonElement;

// Set Modals listeners
modal.addEventListener('click', () => modal.classList.remove('showModal'));
modalContent.addEventListener('click', (e) => e.stopPropagation());
modalClose.addEventListener('click', () => modal.classList.remove('showModal'));
