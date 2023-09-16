import { getMovieGenres } from './api/movie';
import { infiniteScroll, searchDelay } from './utils';

window.addEventListener('load', getMovieGenres);
infiniteScroll();

const searchButton = document.getElementById('searchForMovies');
searchButton.addEventListener('keyup', searchDelay);

// Modal elements
const modal = document.getElementById('movieDetailsModal');
const modalContent = document.getElementById('movieModalContent');
const modalClose = document.getElementById('movieModalClose');

// Set Modals listeners
modal.addEventListener('click', () => modal.classList.remove('showModal'));
modalContent.addEventListener('click', (e) => e.stopPropagation());
modalClose.addEventListener('click', () => modal.classList.remove('showModal'));
