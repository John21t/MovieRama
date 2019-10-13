import { nowPlayingMovies, searchForMovies } from "./Utils.js";

const searchButton = document.getElementById('searchForMovies');

// Modal elements
export const modal = document.getElementById('movieDetailsModal'),
    modalContent = document.getElementById('movieModalContent');
const modalClose = document.getElementById('movieModalClose');

// Initializing the timer variable
let timer = 0;

/**
 * Implements the infinite scroll.
 * Calculates if the user scrolled at the bottom of the page,
 * then shows more movies
 */
export const infiniteScroll = () => {
    // checks to see if the user has scrolled to the bottom of the page
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        if (searchButton.value) {
            searchForMovies(searchButton.value);
        } else nowPlayingMovies();
    }
};

/**
 * Implements a delay for the search bar.
 * Clears the timer if it has already been set,
 * then makes a new one.
 */
export const searchDelay = (event) => {
    clearTimeout(timer);
    timer = setTimeout(searchForMovies.bind(this, event.target.value), 500);
};

// Set Modals listeners
modal.addEventListener('click', () => modal.classList.remove("showModal"));
modalContent.addEventListener('click', (e) => e.stopPropagation());
modalClose.addEventListener('click', () => modal.classList.remove("showModal"));

